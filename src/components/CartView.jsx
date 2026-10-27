import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { ShoppingCart, Trash2, ArrowRight, AlertCircle } from "lucide-react";

function CartView({ showToast }) {
  // Directly consume safe context states and functions
  const { user, setUser, cart = [], setCart, items = [], setItems, setCurrentView } = useContext(AppContext);

  // Safe fallbacks so it never crashes
  const safeCart = Array.isArray(cart) ? cart : [];
  const safeItems = Array.isArray(items) ? items : [];
  
  // FIX: Strictly check if credits is defined, otherwise fallback to 100. Allows 0 UC correctly!
  const currentCredits = user?.credits !== undefined && user?.credits !== null ? Number(user.credits) : 100;

  const totalCost = safeCart.reduce(
    (sum, item) => sum + (Number(item?.price) || 0),
    0
  );

  const hasInsufficientFunds = currentCredits < totalCost;

  const handleRemoveFromCart = (id) => {
    setCart(safeCart.filter((item) => item.id !== id));
    if (showToast) showToast("Item removed from cart");
  };

  const handleCheckout = () => {
    if (safeCart.length === 0) return;

    if (hasInsufficientFunds) {
      if (showToast) showToast("Insufficient Uni Credits to complete purchase.", "error");
      return;
    }

    // Deduct credits and update user object
    const updatedUser = {
      ...user,
      credits: currentCredits - totalCost
    };
    setUser(updatedUser);

    // Remove purchased items from the marketplace items pool
    const cartItemIds = safeCart.map((c) => c.id);
    setItems(safeItems.filter((item) => !cartItemIds.includes(item.id)));

    setCart([]);
    if (showToast) showToast("Purchase successful! Items are yours.", "success");
    setCurrentView("home");
  };

  return (
    <div
      className="fade-in"
      style={{ maxWidth: "800px", margin: "0 auto", width: "100%" }}
    >
      <h2 style={{ fontSize: "1.8rem", marginBottom: "24px", fontWeight: 800 }}>Your Cart</h2>

      {safeCart.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            background: "var(--bg-card)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border)",
          }}
        >
          <ShoppingCart
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
            Your cart is empty
          </h3>
          <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>
            Looks like you haven't added anything to your cart yet.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => setCurrentView("marketplace")}
          >
            Browse Marketplace
          </button>
        </div>
      ) : (
        <div>
          {safeCart.map((item) => (
            <div key={item.id || Math.random()} className="cart-item" style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px", background: "var(--bg-card)", marginBottom: "12px", borderRadius: "12px", border: "1px solid var(--border)" }}>
              <img
                src={item.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=80"}
                alt={item.title}
                className="cart-item-img"
                style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px" }}
              />
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    marginBottom: "4px",
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  Sold by: @{item.seller || "student"}
                </p>
              </div>
              <div
                style={{
                  fontWeight: 700,
                  color: "var(--primary)",
                  fontSize: "1.1rem",
                  minWidth: "80px",
                  textAlign: "right",
                }}
              >
                {Number(item.price)} UC
              </div>
              <button
                className="btn btn-danger"
                style={{ padding: "8px", background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: "6px", cursor: "pointer" }}
                onClick={() => handleRemoveFromCart(item.id)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          <div className="cart-summary" style={{ marginTop: "24px", padding: "24px", background: "var(--bg-card)", borderRadius: "12px", border: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.9rem",
                  marginBottom: "4px",
                }}
              >
                Total Cost
              </p>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 800 }}>
                {totalCost} UC
              </h3>

              <p
                style={{
                  color: hasInsufficientFunds
                    ? "var(--error)"
                    : "var(--text-muted)",
                  fontSize: "0.85rem",
                  marginTop: "4px",
                  fontWeight: hasInsufficientFunds ? "bold" : "normal",
                }}
              >
                Available Balance: {currentCredits} UC
              </p>

              {hasInsufficientFunds && (
                <p
                  style={{
                    color: "var(--error)",
                    fontSize: "0.8rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    marginTop: "4px",
                  }}
                >
                  <AlertCircle size={14} /> Balance too low. Please top up in
                  your account.
                </p>
              )}
            </div>

            <button
              className="btn btn-primary"
              style={{
                padding: "14px 24px",
                fontSize: "1.05rem",
                opacity: hasInsufficientFunds ? 0.5 : 1,
                cursor: hasInsufficientFunds ? "not-allowed" : "pointer",
              }}
              onClick={handleCheckout}
              disabled={hasInsufficientFunds}
            >
              Checkout & Pay{" "}
              <ArrowRight size={18} style={{ marginLeft: "8px" }} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartView;