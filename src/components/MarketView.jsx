import React, { useState } from "react";
import { Search, Handshake, X, ArrowRight } from "lucide-react";
import ItemCard from "./ItemCard";

function MarketView({ user, items, cart, setCart, showToast }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [tradeModalItem, setTradeModalItem] = useState(null);
  const [tradeMessage, setTradeMessage] = useState("");

  const handleAddToCart = (item) => {
    if (item.seller === user?.name) {
      showToast("You cannot add your own item to cart!", "error");
      return;
    }
    if (cart.find((c) => c.id === item.id)) {
      showToast("Item is already in your cart", "error");
      return;
    }
    setCart([...cart, item]);
    showToast(`${item.title} added to cart!`, "success");
  };

  const handleTrade = (item) => {
    if (item.seller === user?.name) {
      showToast("You cannot trade with yourself!", "error");
    } else {
      setTradeModalItem(item);
    }
  };

  const submitTrade = (e) => {
    e.preventDefault();
    if (!tradeMessage.trim()) {
      showToast("Please describe what you want to trade.", "error");
      return;
    }
    showToast(`Trade proposal sent to ${tradeModalItem.seller}!`, "success");
    setTradeModalItem(null);
    setTradeMessage("");
  };

  const filteredAndSortedItems = items
    .filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = category === "All" || item.category === category;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return b.id - a.id;
    });

  return (
    <div className="fade-in">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Campus Listings</h2>
      </div>

      <div className="toolbar">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search items by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <select
            className="filter-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Academics">Academics</option>
            <option value="Supplies">Supplies</option>
            <option value="Food">Food</option>
            <option value="Other">Other</option>
          </select>
          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {filteredAndSortedItems.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "var(--text-muted)",
          }}
        >
          <Search
            size={48}
            style={{ opacity: 0.2, margin: "0 auto 16px auto" }}
          />
          <h3
            style={{
              fontSize: "1.25rem",
              marginBottom: "8px",
              color: "var(--text-main)",
            }}
          >
            No items found
          </h3>
          <p>
            Try adjusting your search or filters to find what you're looking
            for.
          </p>
        </div>
      ) : (
        <div className="item-grid">
          {filteredAndSortedItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              user={user}
              variant="market"
              onAddToCart={handleAddToCart}
              onTrade={handleTrade}
            />
          ))}
        </div>
      )}

      {tradeModalItem && (
        <div className="modal-overlay" onClick={() => setTradeModalItem(null)}>
          <div
            className="modal-content fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setTradeModalItem(null)}
            >
              <X size={18} />
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  background: "var(--primary-light)",
                  color: "var(--primary)",
                  padding: "10px",
                  borderRadius: "50%",
                }}
              >
                <Handshake size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                  Propose a Trade
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                  with {tradeModalItem.seller}
                </p>
              </div>
            </div>

            <div
              style={{
                background: "var(--bg-main)",
                padding: "16px",
                borderRadius: "var(--radius-md)",
                marginBottom: "20px",
                border: "1px solid var(--border)",
              }}
            >
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--text-muted)",
                  marginBottom: "4px",
                }}
              >
                Requesting Item:
              </p>
              <p style={{ fontWeight: 600 }}>{tradeModalItem.title}</p>
            </div>

            <form onSubmit={submitTrade}>
              <div className="form-group">
                <label className="form-label">
                  What are you offering in return? *
                </label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="e.g., I can trade my Scientific Calculator for your Notes. It is in good condition..."
                  value={tradeMessage}
                  onChange={(e) => setTradeMessage(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%", padding: "14px", fontSize: "1rem" }}
              >
                Send Trade Proposal <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MarketView;