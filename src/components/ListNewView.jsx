import React, { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Upload } from "lucide-react";

function ListNewView({ showToast }) {
  const { user, items, setItems, setCurrentView } = useContext(ThemeContext);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "Books",
    condition: "Like New",
    location: "Campus Hostel",
    image: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Compress & Resize device image using Canvas to prevent payload size overflow
  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 400;
          const MAX_HEIGHT = 400;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          // Compress to lightweight JPEG (0.7 quality)
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7);
          setFormData((prev) => ({ ...prev, image: compressedDataUrl }));
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      price: Number(formData.price),
      category: formData.category,
      condition: formData.condition,
      location: formData.location.trim(),
      image:
        formData.image ||
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=80",
      seller: user?.username || user?.name || "student_user",
    };

    // Controller with 1.5s timeout for fast fallback
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);

    fetch("http://localhost:5000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newItem),
      signal: controller.signal,
    })
      .then((res) => {
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error("Server error");
        return res.json();
      })
      .then((savedItem) => {
        setItems((prevItems) => [
          savedItem,
          ...(Array.isArray(prevItems) ? prevItems : []),
        ]);
        if (showToast)
          showToast("Item listed successfully in Marketplace!", "success");
        setCurrentView("marketplace");
      })
      .catch(() => {
        clearTimeout(timeoutId);
        // Fallback for offline or json-server down scenario
        const localItem = { ...newItem, id: Date.now() };
        setItems((prevItems) => [
          localItem,
          ...(Array.isArray(prevItems) ? prevItems : []),
        ]);
        if (showToast)
          showToast("Item listed successfully! (Local Session)", "success");
        setCurrentView("marketplace");
      });
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <div className="auth-card fade-in" style={{ maxWidth: "100%" }}>
        <h2
          style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "8px" }}
        >
          List a New Item
        </h2>
        <p
          style={{
            color: "var(--text-muted)",
            marginBottom: "24px",
            fontSize: "0.9rem",
          }}
        >
          Share resources or trade items with fellow students for Uni Credits
          (UC)
        </p>

        <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
          <div className="form-group">
            <label className="form-label">Item Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="e.g. Data Structures & Algorithms Book"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              placeholder="Mention edition, condition, usage details..."
              rows="3"
              value={formData.description}
              onChange={handleInputChange}
              required
              style={{ resize: "vertical" }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Upload Image from Device (Auto-compressed)
            </label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={handleImageFileChange}
              style={{ padding: "8px" }}
            />
            {formData.image && (
              <div
                style={{
                  marginTop: "8px",
                  fontSize: "0.8rem",
                  color: "var(--primary)",
                  fontWeight: 600,
                }}
              >
                ✓ Image compressed and ready!
              </div>
            )}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <div className="form-group">
              <label className="form-label">Price (in Uni Credits - UC)</label>
              <input
                type="number"
                name="price"
                className="form-control"
                placeholder="e.g. 50"
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
                <option value="Books">Books & Notes</option>
                <option value="Electronics">Electronics</option>
                <option value="Sports">Sports Equipment</option>
                <option value="Hostel">Hostel Utilities</option>
              </select>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <div className="form-group">
              <label className="form-label">Condition</label>
              <select
                name="condition"
                className="form-control"
                value={formData.condition}
                onChange={handleInputChange}
              >
                <option value="Brand New">Brand New</option>
                <option value="Like New">Like New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Location / Pickup Spot</label>
              <input
                type="text"
                name="location"
                className="form-control"
                placeholder="e.g. Hostel Block C"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", padding: "12px", marginTop: "12px" }}
          >
            <Upload size={18} /> Publish to Marketplace
          </button>
        </form>
      </div>
    </div>
  );
}

export default ListNewView;
