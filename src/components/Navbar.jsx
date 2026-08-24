import React from "react";
import {
  Sparkles,
  Wallet,
  Home,
  ShoppingBag,
  ShoppingCart,
  PlusCircle,
  User,
} from "lucide-react";

function Navbar({ user, currentView, setCurrentView, cart }) {
  return (
    <header className="navbar">
      <div
        className="navbar-brand"
        onClick={() => user && setCurrentView("home")}
      >
        <div
          style={{
            background: "var(--primary)",
            color: "white",
            padding: "6px",
            borderRadius: "8px",
          }}
        >
          <Sparkles size={20} />
        </div>
        UniTrade
      </div>

      {user && (
        <div className="navbar-links">
          <div className="credit-badge">
            <Wallet size={16} /> {user.credits} UC
          </div>
          <button
            className={`btn btn-ghost ${currentView === "home" ? "active" : ""}`}
            onClick={() => setCurrentView("home")}
          >
            <Home size={18} /> Home
          </button>
          <button
            className={`btn btn-ghost ${currentView === "marketplace" ? "active" : ""}`}
            onClick={() => setCurrentView("marketplace")}
          >
            <ShoppingBag size={18} /> Market
          </button>
          <button
            className={`btn btn-ghost ${currentView === "cart" ? "active" : ""}`}
            onClick={() => setCurrentView("cart")}
            style={{ position: "relative" }}
          >
            <ShoppingCart size={18} /> Cart
            {cart.length > 0 && (
              <span className="cart-badge">{cart.length}</span>
            )}
          </button>
          <button
            className={`btn btn-ghost ${currentView === "list_item" ? "active" : ""}`}
            onClick={() => setCurrentView("list_item")}
          >
            <PlusCircle size={18} /> List Item
          </button>
          <button
            className={`btn btn-ghost ${currentView === "wallet" ? "active" : ""}`}
            onClick={() => setCurrentView("wallet")}
          >
            <User size={18} /> Account
          </button>
        </div>
      )}
    </header>
  );
}

// EXPORT AT THE END
export default Navbar;
