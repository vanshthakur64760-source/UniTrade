import React from "react";
import { ShoppingCart, Trash2, ArrowRight, AlertCircle } from "lucide-react";

function CartView({
  user,
  setUser,
  cart,
  setCart,
  items,
  setItems,
  showToast,
  setCurrentView,
}) {
  const totalCost = cart.reduce(
    (sum, item) => sum + (Number(item.price) || 0),
    0,
  );
  const currentCredits = Number(user.credits) || 0;

  const hasInsufficientFunds = currentCredits < totalCost;

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
    showToast("Item removed from cart");
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    if (hasInsufficientFunds) {
      showToast("Insufficient Uni Credits to complete purchase.", "error");
      return;
    }

    setUser({ ...user, credits: currentCredits - totalCost });

    const cartItemIds = cart.map((c) => c.id);
    setItems(items.filter((item) => !cartItemIds.includes(item.id)));

    setCart([]);
    showToast("Purchase successful! Items are yours.", "success");
    setCurrentView("home");
  };

  return (
    <div
      className="fade-in"
      style={{ maxWidth: "800px", margin: "0 auto", width: "100%" }}
    >
      <h2 style={{ fontSize: "1.8rem", marginBottom: "24px" }}>Your Cart</h2>

      {cart.length === 0 ? (
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
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={item.image}
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
                  Sold by: {item.seller}
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
                style={{ padding: "8px" }}
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

              {/* Dynamic UI depending on balance */}
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
