import React, { useState } from "react";
import { MapPin } from "lucide-react";

function ListNewView({ user, items, setItems, setCurrentView, showToast }) {
  const [newItem, setNewItem] = useState({
    title: "",
    price: "",
    category: "Electronics",
    condition: "Like New",
    desc: "",
    image: "",
    location: "",
  });

  const handleListSubmit = (e) => {
    e.preventDefault();
    if (
      !newItem.title ||
      !newItem.price ||
      !newItem.desc ||
      !newItem.location ||
      !newItem.image
    ) {
      showToast(
        "Please fill in all required fields and upload an image",
        "error",
      );
      return;
    }

    const itemToSave = {
      id: Date.now(),
      ...newItem,
      price: Number(newItem.price) || 0, // strict number conversion
      seller: user.name,
    };

    setItems([itemToSave, ...items]);
    showToast("Item listed successfully!");
    setCurrentView("marketplace");
  };

  return (
    <div className="fade-in" style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "1.8rem", marginBottom: "24px" }}>
        List a New Item
      </h2>
      <div
        style={{
          background: "var(--bg-card)",
          padding: "30px",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border)",
        }}
      >
        <form onSubmit={handleListSubmit}>
          <div className="form-group">
            <label className="form-label">Item Title *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Scientific Calculator"
              required
              value={newItem.title}
              onChange={(e) =>
                setNewItem({ ...newItem, title: e.target.value })
              }
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-control"
                value={newItem.category}
                onChange={(e) =>
                  setNewItem({ ...newItem, category: e.target.value })
                }
              >
                <option>Electronics</option>
                <option>Academics</option>
                <option>Supplies</option>
                <option>Food</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Condition</label>
              <select
                className="form-control"
                value={newItem.condition}
                onChange={(e) =>
                  setNewItem({ ...newItem, condition: e.target.value })
                }
              >
                <option>New</option>
                <option>Like New</option>
                <option>Good</option>
                <option>Fair</option>
                <option>Poor</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Price (in Uni Credits) *</label>
            <input
              type="number"
              min="1"
              className="form-control"
              placeholder="e.g. 50"
              required
              value={newItem.price}
              onChange={(e) =>
                setNewItem({ ...newItem, price: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label className="form-label">Item Image *</label>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <div style={{ width: "100%" }}>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  style={{ padding: "9px 12px", background: "white" }}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      if (file.size > 2 * 1024 * 1024) {
                        showToast("Image size must be less than 2MB", "error");
                        e.target.value = "";
                        return;
                      }
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setNewItem({ ...newItem, image: reader.result });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
            </div>
            {newItem.image && (
              <div
                style={{
                  marginTop: "16px",
                  width: "120px",
                  height: "120px",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  border: "1px solid var(--border)",
                }}
              >
                <img
                  src={newItem.image}
                  alt="Preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            )}
            <small
              style={{
                color: "var(--text-muted)",
                marginTop: "8px",
                display: "block",
              }}
            >
              Upload a file directly from your device (Max 2MB).
            </small>
          </div>

          <div className="form-group">
            <label className="form-label">Pickup Location *</label>
            <div style={{ position: "relative" }}>
              <MapPin
                size={18}
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "14px",
                  color: "var(--text-muted)",
                }}
              />
              <input
                type="text"
                className="form-control"
                style={{ paddingLeft: "40px" }}
                placeholder="e.g. Block A Hostel, Campus Library"
                required
                value={newItem.location}
                onChange={(e) =>
                  setNewItem({ ...newItem, location: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description *</label>
            <textarea
              className="form-control"
              rows="4"
              placeholder="Describe your item..."
              required
              value={newItem.desc}
              onChange={(e) => setNewItem({ ...newItem, desc: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: "100%", padding: "14px" }}
          >
            Publish Listing
          </button>
        </form>
      </div>
    </div>
  );
}

// EXPORT AT THE END
export default ListNewView;
