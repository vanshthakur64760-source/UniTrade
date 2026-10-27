import React, { useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";

function ListNewView({ user, setItems, setCurrentView, showToast }) {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "Academics",
    condition: "Like New",
    location: "Hostel Block A",
    desc: "",
    image: ""
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.price || !formData.desc) {
      if (showToast) showToast("Please fill in all required fields!", "error");
      return;
    }

    setLoading(true);

    const rawSellerName = user?.name || user?.email || "John Doe";
    const cleanSellerName = rawSellerName.includes("@") 
      ? rawSellerName.split("@")[0] 
      : rawSellerName;

    const newItem = {
      title: formData.title,
      price: Number(formData.price),
      category: formData.category,
      condition: formData.condition,
      location: formData.location || "Campus Main",
      desc: formData.desc,
      image: formData.image || imagePreview || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500",
      seller: cleanSellerName
    };

    fetch("http://localhost:5000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newItem)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to post item to backend");
        return res.json();
      })
      .then((savedItem) => {
        setItems((prevItems) => [savedItem, ...prevItems]);
        if (showToast) showToast("Listing published and saved to server!", "success");
        setLoading(false);
        setCurrentView("marketplace");
      })
      .catch((err) => {
        console.error("Error creating listing:", err);
        if (showToast) showToast("Failed to connect to backend server.", "error");
        setLoading(false);
      });
  };

  return (
    <div className="fade-in" style={{ maxWidth: "650px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "20px" }}>
        List a New Item
      </h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div className="form-group">
          <label className="form-label">Item Title *</label>
          <input
            type="text"
            name="title"
            className="form-control"
            placeholder="e.g., Casio FX-991EX Scientific Calculator"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div className="form-group">
            <label className="form-label">Price (in Uni Credits) *</label>
            <input
              type="number"
              name="price"
              className="form-control"
              placeholder="e.g., 300"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              name="category"
              className="form-control"
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="Academics">Academics</option>
              <option value="Electronics">Electronics</option>
              <option value="Supplies">Supplies</option>
              <option value="Food">Food</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div className="form-group">
            <label className="form-label">Condition</label>
            <select
              name="condition"
              className="form-control"
              value={formData.condition}
              onChange={handleInputChange}
            >
              <option value="Like New">Like New</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Used">Used</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Campus Location</label>
            <input
              type="text"
              name="location"
              className="form-control"
              placeholder="e.g., Block A Hostel"
              value={formData.location}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Image Input Options: Choose File or Paste URL */}
        <div className="form-group">
          <label className="form-label">Item Image (Upload File or Paste URL)</label>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="form-control"
              style={{ padding: "10px" }}
            />
            <input
              type="url"
              name="image"
              className="form-control"
              placeholder="Or paste image URL here (https://...)"
              value={formData.image.startsWith("data:") ? "" : formData.image}
              onChange={handleInputChange}
            />
          </div>
          {imagePreview && (
            <div style={{ marginTop: "10px", position: "relative", width: "100%", maxHeight: "150px", overflow: "hidden", borderRadius: "8px" }}>
              <img src={imagePreview} alt="Preview" style={{ width: "100%", height: "150px", objectFit: "cover" }} />
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Description *</label>
          <textarea
            name="desc"
            className="form-control"
            rows="4"
            placeholder="Describe condition, reason for selling, accessories included..."
            value={formData.desc}
            onChange={handleInputChange}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ padding: "14px", fontSize: "1rem", marginTop: "10px" }}
          disabled={loading}
        >
          {loading ? "Publishing to Server..." : "Publish Listing"}
        </button>
      </form>
    </div>
  );
}

export default ListNewView;