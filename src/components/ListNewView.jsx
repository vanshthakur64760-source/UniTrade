import React, { useState } from "react";
import { MapPin, X } from "lucide-react";

export default function ListNewView({ user, items, setItems, setCurrentView, showToast }) {
  // Structured Form State
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "Electronics",
    condition: "Like New",
    location: "",
    desc: "",
    image: ""
  });

  const [errors, setErrors] = useState({});

  const categories = ["Electronics", "Academics", "Supplies", "Food", "Other"];
  const conditions = ["New", "Like New", "Good", "Fair", "Poor"];
  const commonLocations = ["Block A Hostel", "Block B Hostel", "Central Library", "Food Court", "Newton Hall"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast("Image size must be less than 2MB", "error");
        e.target.value = "";
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
        if (errors.image) setErrors((prev) => ({ ...prev, image: "" }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!formData.price) {
      newErrors.price = "Price in Uni Credits is required";
    } else if (Number(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Pickup location is required";
    }

    if (!formData.desc.trim()) {
      newErrors.desc = "Description is required";
    } else if (formData.desc.length < 5) {
      newErrors.desc = "Please provide a brief description";
    }

    setErrors(newErrors);
    return newErrors;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      const itemToSave = {
        id: Date.now(),
        title: formData.title,
        price: Number(formData.price),
        category: formData.category,
        condition: formData.condition,
        location: formData.location,
        desc: formData.desc,
        image: formData.image,
        seller: user?.name || "Student",
      };

      setItems([itemToSave, ...items]);
      showToast("Item listed successfully!");

      setFormData({
        title: "",
        price: "",
        category: "Electronics",
        condition: "Like New",
        location: "",
        desc: "",
        image: ""
      });
      setErrors({});

      setCurrentView("marketplace");
    } else {
      showToast("Please fill in all required fields correctly", "error");
    }
  };

  return (
    <div className="fade-in" style={{ maxWidth: "600px", margin: "0 auto", paddingBottom: "40px" }}>
      <h2 style={{ fontSize: "1.8rem", marginBottom: "24px" }}>List a New Item</h2>

      <div className="form-card">
        <form onSubmit={handleFormSubmit}>
          {/* Title */}
          <div className="form-group">
            <label className="form-label">Item Title *</label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="e.g. Engineering Drawing Board"
              value={formData.title}
              onChange={handleInputChange}
            />
            {errors.title && <p className="error-text">{errors.title}</p>}
          </div>

          {/* Category & Condition */}
          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                name="category"
                className="form-control"
                value={formData.category}
                onChange={handleInputChange}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Condition</label>
              <select
                name="condition"
                className="form-control"
                value={formData.condition}
                onChange={handleInputChange}
              >
                {conditions.map((cond) => (
                  <option key={cond} value={cond}>{cond}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Price */}
          <div className="form-group">
            <label className="form-label">Price (in Uni Credits) *</label>
            <input
              type="number"
              name="price"
              min="1"
              className="form-control"
              placeholder="e.g. 50"
              value={formData.price}
              onChange={handleInputChange}
            />
            {errors.price && <p className="error-text">{errors.price}</p>}
          </div>

          {/* Image Upload */}
          <div className="form-group">
            <label className="form-label">Item Image (Optional)</label>
            <input
              type="file"
              accept="image/*"
              className="form-control file-input"
              onChange={handleImageUpload}
            />
            {formData.image && (
              <div className="img-preview-box">
                <img src={formData.image} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, image: "" })}
                  className="remove-img-btn"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>

          {/* Location */}
          <div className="form-group">
            <label className="form-label">Pickup Location *</label>
            <div style={{ position: "relative", marginBottom: "8px" }}>
              <MapPin size={18} style={{ position: "absolute", left: "12px", top: "14px", color: "#6b7280" }} />
              <input
                type="text"
                name="location"
                className="form-control"
                style={{ paddingLeft: "40px" }}
                placeholder="e.g. Block A Hostel"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>
            {errors.location && <p className="error-text">{errors.location}</p>}
            
            {/* Quick Pills */}
            <div className="quick-chips">
              <span className="chips-label">Quick:</span>
              {commonLocations.map((loc, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setFormData({ ...formData, location: loc })}
                  className={`chip-btn ${formData.location === loc ? "active" : ""}`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label">Description *</label>
            <textarea
              name="desc"
              className="form-control"
              rows="3"
              placeholder="Describe your item..."
              value={formData.desc}
              onChange={handleInputChange}
            />
            {errors.desc && <p className="error-text">{errors.desc}</p>}
          </div>

          <button type="submit" className="primary-btn" style={{ width: "100%", padding: "14px", marginTop: "10px" }}>
            Publish Listing
          </button>
        </form>
      </div>
    </div>
  );
}