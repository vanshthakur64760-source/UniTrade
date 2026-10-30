import React, { useEffect, useState } from "react";
import { ShoppingCart, MapPin, MessageSquare, X, Send } from "lucide-react";

function MarketView({ items, setItems, cart, setCart, user, showToast }) {
  const [selectedItemForTrade, setSelectedItemForTrade] = useState(null);
  const [tradeMessage, setTradeMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/items")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0 && setItems) setItems(data);
      })
      .catch(() => {
        if ((!items || items.length === 0) && setItems) {
          setItems([
            {
              id: 1,
              title: "Engineering Physics & Math Textbooks",
              description: "Barely used, 3rd semester essential book.",
              price: 250,
              category: "Books",
              condition: "Like New",
              location: "Hostel Block A",
              seller: "Rohan Gupta",
              image:
                "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80",
            },
          ]);
        }
      });
  }, [setItems]);

  const handleAddToCart = (item) => {
    const safeCart = Array.isArray(cart) ? cart : [];
    if (safeCart.some((c) => c.id === item.id)) {
      if (showToast) showToast("Item is already in your cart!", "error");
      return;
    }
    if (setCart) setCart([...safeCart, item]);
    if (showToast) showToast(`Added "${item.title}" to cart!`, "success");
  };

  const openTradeModal = (item) => {
    setSelectedItemForTrade(item);
    setChatMessages([
      {
        sender: item.seller || "Seller",
        text: `Hi! Interested in my ${item.title}? Let's discuss the trade.`,
      },
    ]);
  };

  const sendTradeMessage = (e) => {
    e.preventDefault();
    if (!tradeMessage.trim()) return;
    const currentUserName = user?.username || user?.name || "You";
    setChatMessages((prev) => [
      ...prev,
      { sender: currentUserName, text: tradeMessage.trim() },
    ]);
    setTradeMessage("");
    if (showToast) showToast("Trade offer message sent to seller!", "success");
  };

  const safeItems = Array.isArray(items) ? items : [];

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "1.8rem", fontWeight: 800 }}>
          Campus Marketplace
        </h2>
        <p style={{ color: "var(--text-muted)" }}>
          Explore and trade items within Chitkara student community
        </p>
      </div>

      <div className="item-grid">
        {safeItems.map((item) => (
          <div key={item.id || Math.random()} className="item-card">
            <img
              src={
                item.image ||
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=80"
              }
              alt={item.title}
              className="item-image"
            />
            <div className="item-content">
              <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                <span className="tag tag-category">{item.category}</span>
                <span className="tag tag-condition">{item.condition}</span>
              </div>
              <h3 className="item-title">{item.title}</h3>
              <p className="item-desc">{item.description}</p>
              <div className="item-location">
                <MapPin size={14} /> {item.location} @
                {item.seller || "student"}
              </div>
              <div className="item-footer">
                <span
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 800,
                    color: "var(--primary)",
                  }}
                >
                  {item.price} UC
                </span>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    className="btn btn-ghost"
                    onClick={() => openTradeModal(item)}
                  >
                    <MessageSquare size={14} /> Trade
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingCart size={14} /> Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trade Modal */}
      {selectedItemForTrade && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>
                Trade Offer
              </h3>
              <button
                className="modal-close"
                onClick={() => setSelectedItemForTrade(null)}
              >
                <X size={18} />
              </button>
            </div>
            <div
              className="form-group"
              style={{
                height: "200px",
                overflowY: "auto",
                background: "var(--bg-main)",
                padding: "12px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border)",
              }}
            >
              {chatMessages.map((msg, idx) => {
                const isMe =
                  msg.sender === (user?.username || user?.name || "You");
                return (
                  <div
                    key={idx}
                    style={{
                      textAlign: isMe ? "right" : "left",
                      marginBottom: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.7rem",
                        color: "var(--text-muted)",
                        display: "block",
                      }}
                    >
                      {msg.sender}
                    </span>
                    <span
                      style={{
                        display: "inline-block",
                        background: isMe ? "var(--primary)" : "#e5e7eb",
                        color: isMe ? "white" : "black",
                        padding: "6px 12px",
                        borderRadius: "8px",
                        fontSize: "0.9rem",
                      }}
                    >
                      {msg.text}
                    </span>
                  </div>
                );
              })}
            </div>
            <form
              onSubmit={sendTradeMessage}
              style={{ display: "flex", gap: "8px" }}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Propose a trade..."
                value={tradeMessage}
                onChange={(e) => setTradeMessage(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MarketView;