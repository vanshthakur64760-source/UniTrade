import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { ShoppingCart, MapPin, MessageSquare, X, Send } from "lucide-react";

function MarketView({ showToast }) {
  const { items, setItems, cart, setCart, user } = useContext(AppContext);
  const [selectedItemForTrade, setSelectedItemForTrade] = useState(null);
  const [tradeMessage, setTradeMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/items")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setItems(data);
        }
      })
      .catch(() => {
        if (!items || items.length === 0) {
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
              image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80"
            }
          ]);
        }
      });
  }, [setItems]);

  const handleAddToCart = (item) => {
    if (cart.some((c) => c.id === item.id)) {
      if (showToast) showToast("Item is already in your cart!", "error");
      return;
    }
    const updatedCart = [...cart, item];
    setCart(updatedCart);
    if (showToast) showToast(`Added "${item.title}" to cart!`, "success");
  };

  const openTradeModal = (item) => {
    setSelectedItemForTrade(item);
    setChatMessages([
      { sender: item.seller || "Seller", text: `Hi! Interested in my ${item.title}? Let's discuss the trade.` }
    ]);
  };

  const sendTradeMessage = (e) => {
    e.preventDefault();
    if (!tradeMessage.trim()) return;

    const currentUserName = user?.username || user?.name || "You";
    const newMsg = { sender: currentUserName, text: tradeMessage.trim() };
    setChatMessages((prev) => [...prev, newMsg]);
    setTradeMessage("");

    if (showToast) showToast("Trade offer message sent to seller!", "success");
  };

  const safeItems = Array.isArray(items) ? items : [];

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "1.8rem", fontWeight: 800 }}>Campus Marketplace</h2>
        <p style={{ color: "var(--text-muted)" }}>Explore and trade items within Chitkara student community</p>
      </div>

      <div className="item-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
        {safeItems.map((item) => (
          <div key={item.id || Math.random()} className="item-card fade-in" style={{ background: "white", borderRadius: "12px", border: "1px solid var(--border)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <img 
              src={item.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=80"} 
              alt={item.title} 
              style={{ width: "100%", height: "180px", objectFit: "cover" }}
            />

            <div style={{ padding: "16px", display: "flex", flexDirection: "column", flex: 1 }}>
              <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                <span className="tag" style={{ background: "#e0e7ff", color: "#4f46e5", padding: "2px 8px", borderRadius: "4px", fontSize: "0.75rem", fontWeight: 600 }}>{item.category}</span>
                <span className="tag" style={{ background: "#f3f4f6", color: "#374151", padding: "2px 8px", borderRadius: "4px", fontSize: "0.75rem", fontWeight: 600 }}>{item.condition}</span>
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "6px" }}>{item.title}</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "12px", flex: 1 }}>{item.description}</p>
              
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px", marginBottom: "12px" }}>
                <MapPin size={14} /> {item.location} • @{item.seller || "student"}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border)", paddingTop: "12px" }}>
                <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--primary)" }}>
                  {item.price} UC
                </span>
                
                <div style={{ display: "flex", gap: "8px" }}>
                  {/* Trade / Counter Offer Button */}
                  <button 
                    className="btn btn-ghost" 
                    onClick={() => openTradeModal(item)}
                    style={{ padding: "8px 10px", fontSize: "0.8rem", border: "1px solid var(--border)", background: "white", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}
                  >
                    <MessageSquare size={14} /> Trade
                  </button>

                  <button 
                    className="btn btn-primary" 
                    onClick={() => handleAddToCart(item)}
                    style={{ padding: "8px 12px", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "4px" }}
                  >
                    <ShoppingCart size={14} /> Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trade / Chat Modal */}
      {selectedItemForTrade && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000
        }}>
          <div style={{ background: "white", width: "450px", borderRadius: "16px", padding: "24px", boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>Trade Offer: {selectedItemForTrade.title}</h3>
              <button onClick={() => setSelectedItemForTrade(null)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ background: "#f9fafb", borderRadius: "8px", padding: "12px", height: "200px", overflowY: "auto", marginBottom: "16px", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "8px" }}>
              {chatMessages.map((msg, idx) => {
                const isMe = msg.sender === (user?.username || user?.name || "You");
                return (
                  <div key={idx} style={{ textAlign: isMe ? "right" : "left" }}>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block" }}>{msg.sender}</span>
                    <span style={{ 
                      display: "inline-block", background: isMe ? "#4f46e5" : "#e5e7eb", 
                      color: isMe ? "white" : "black", padding: "6px 12px", borderRadius: "8px", fontSize: "0.9rem", textAlign: "left" 
                    }}>
                      {msg.text}
                    </span>
                  </div>
                );
              })}
            </div>

            <form onSubmit={sendTradeMessage} style={{ display: "flex", gap: "8px" }}>
              <input
                type="text"
                className="form-control"
                placeholder="Propose an item trade or counter offer..."
                value={tradeMessage}
                onChange={(e) => setTradeMessage(e.target.value)}
                style={{ flex: 1 }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: "0 16px" }}>
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