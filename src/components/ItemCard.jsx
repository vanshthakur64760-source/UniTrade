import React from "react";
import { MapPin, ShoppingCart, Handshake } from "lucide-react";

function ItemCard({ item, user, variant, onClick, onAddToCart, onTrade }) {
  const sellerName = item.seller || "Unknown";

  return (
    <div
      className="item-card"
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      {item.image && (
        <img src={item.image} alt={item.title} className="item-image" />
      )}
      <div className="item-content">
        <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
          <span className="tag tag-category">{item.category}</span>
          <span className="tag tag-condition">{item.condition}</span>
        </div>
        <h3 className="item-title">{item.title}</h3>
        <p className="item-desc" style={{ marginBottom: "12px" }}>
          {item.desc}
        </p>

        <div className="item-location" style={{ marginBottom: "auto" }}>
          <MapPin size={16} color="var(--primary)" />
          {item.location || "Campus"}
        </div>

        {variant === "market" && (
          <div className="item-actions" style={{ marginTop: "16px" }}>
            <button
              className="btn btn-primary"
              style={{ padding: "10px" }}
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(item);
              }}
            >
              <ShoppingCart size={16} /> Add to Cart
            </button>
            <button
              className="btn btn-ghost"
              style={{ padding: "10px", border: "1px solid var(--border)" }}
              onClick={(e) => {
                e.stopPropagation();
                onTrade(item);
              }}
            >
              <Handshake size={16} /> Trade
            </button>
          </div>
        )}

        <div className="item-footer" style={{ marginTop: "16px" }}>
          {/* Price is now always visible */}
          <div
            style={{
              fontWeight: 800,
              color: "var(--primary)",
              fontSize: "1.25rem",
            }}
          >
            {Number(item.price)} UC
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.85rem",
              color: "var(--text-muted)",
            }}
          >
            <div
              style={{
                width: "24px",
                height: "24px",
                background: "var(--primary-light)",
                color: "var(--primary)",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
              }}
            >
              {sellerName.charAt(0).toUpperCase()}
            </div>
            {sellerName}{" "}
            {variant === "market" && sellerName === user?.name ? "(You)" : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
