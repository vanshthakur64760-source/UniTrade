import React, { useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { ShoppingCart, MapPin } from "lucide-react";

function MarketView({ showToast }) {
  const { items, setItems, cart, setCart } = useContext(AppContext);

  // Fetch items from json-server on mount with fallback including images
  useEffect(() => {
    fetch("http://localhost:5000/items")
      .then((res) => res.json())
      .then((data) => {
        // Ensure every item has an image property
        const itemsWithImages = data.map((item) => ({
          ...item,
          image: item.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=80"
        }));
        setItems(itemsWithImages);
      })
      .catch(() => {
        // Fallback mock items with proper image URLs if server is offline
        setItems([
          {
            id: 1,
            title: "Engineering Mathematics Textbook",
            description: "Barely used, 3rd semester essential book.",
            price: 50,
            category: "Books",
            condition: "Like New",
            location: "Hostel Block A",
            seller: "senior_coder",
            image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80"
          },
          {
            id: 2,
            title: "Badminton Racket (Yonex)",
            description: "Good condition stringed racket.",
            price: 120,
            category: "Sports",
            condition: "Good",
            location: "Sports Complex",
            seller: "smash_king",
            image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&auto=format&fit=crop&q=80"
          }
        ]);
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

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "1.8rem", fontWeight: 800 }}>Campus Marketplace</h2>
        <p style={{ color: "var(--text-muted)" }}>Explore and trade items within Chitkara student community</p>
      </div>

      <div className="item-grid">
        {items.map((item) => (
          <div key={item.id} className="item-card fade-in">
            {/* Render Item Image */}
            <img 
              src={item.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=80"} 
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
                <MapPin size={16} /> {item.location} • Seller: @{item.seller}
              </div>

              <div className="item-footer">
                <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--primary)" }}>
                  {item.price} UC
                </span>
                <button 
                  className="btn btn-primary" 
                  onClick={() => handleAddToCart(item)}
                  style={{ padding: "8px 14px" }}
                >
                  <ShoppingCart size={16} /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarketView;