import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { ShoppingCart, Trash2, ArrowRight, AlertCircle } from "lucide-react";

function CartView({ showToast }) {
  const {
    user,
    setUser,
    cart = [],
    setCart,
    items = [],
    setItems,
    setCurrentView,
  } = useContext(ThemeContext);

  const safeCart = Array.isArray(cart) ? cart : [];
  const safeItems = Array.isArray(items) ? items : [];
  const currentCredits =
    user?.credits !== undefined && user?.credits !== null
      ? Number(user.credits)
      : 100;

  const totalCost = safeCart.reduce(
    (sum, item) => sum + (Number(item?.price) || 0),
    0,
  );
  const hasInsufficientFunds = currentCredits < totalCost;

  const handleRemoveFromCart = (id) => {
    setCart(safeCart.filter((item) => item.id !== id));
    if (showToast) showToast("Item removed from cart");
  };

  const handleCheckout = () => {
    if (safeCart.length === 0) return;
    if (hasInsufficientFunds) {
      if (showToast)
        showToast("Insufficient Uni Credits to complete purchase.", "error");
      return;
    }

    setUser({ ...user, credits: currentCredits - totalCost });
    const cartItemIds = safeCart.map((c) => c.id);
    setItems(safeItems.filter((item) => !cartItemIds.includes(item.id)));
    setCart([]);
    if (showToast)
      showToast("Purchase successful! Items are yours.", "success");
    setCurrentView("home");
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "1.8rem", marginBottom: "24px", fontWeight: 800 }}>
        Your Cart
      </h2>

      {safeCart.length === 0 ? (
        <div
          className="auth-card"
          style={{
            maxWidth: "100%",
            textAlign: "center",
            padding: "60px 20px",
          }}
        >
          <ShoppingCart
            size={48}
            style={{
              opacity: 0.2,
              margin: "0 auto 16px auto",
              display: "block",
            }}
          />
          <h3 style={{ fontSize: "1.25rem", marginBottom: "8px" }}>
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
            <div key={item.id || Math.random()} className="cart-item">
              <img
                src={
                  item.image ||
                  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=80"
                }
                alt={item.title}
                className="cart-item-img"
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
                onClick={() => handleRemoveFromCart(item.id)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          <div className="cart-summary">
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
              onClick={handleCheckout}
              disabled={hasInsufficientFunds}
              style={{ padding: "14px 24px" }}
            >
              Checkout & Pay <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartView;
