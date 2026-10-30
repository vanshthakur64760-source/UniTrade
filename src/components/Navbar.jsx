import React from "react";
import { useTheme } from "../context/ThemeContext";
import {
  Sun,
  Moon,
  Home,
  Store,
  ShoppingCart,
  PlusCircle,
  User,
  Wallet,
  Sparkles,
} from "lucide-react";

function Navbar({ user, cart, currentView, setCurrentView }) {
  // Pure Theme Hook Consumption
  const { theme, toggleTheme } = useTheme();

  const cartCount = Array.isArray(cart) ? cart.length : 0;
  const userCredits =
    user?.credits !== undefined && user?.credits !== null
      ? Number(user.credits)
      : 100;

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => setCurrentView("home")}>
        <div
          className="btn-primary"
          style={{
            padding: "8px",
            borderRadius: "var(--radius-md)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Sparkles size={20} />
        </div>
        <span>UniTrade</span>
      </div>

      <div className="navbar-links">
        <div
          className="credit-badge"
          onClick={() => setCurrentView("wallet")}
          style={{ cursor: "pointer" }}
        >
          <Wallet size={16} />
          <span>{userCredits} UC</span>
        </div>

        <button
          className={`btn ${currentView === "home" ? "btn-primary" : "btn-ghost"}`}
          onClick={() => setCurrentView("home")}
        >
          <Home size={16} /> Home
        </button>

        <button
          className={`btn ${currentView === "marketplace" ? "btn-primary" : "btn-ghost"}`}
          onClick={() => setCurrentView("marketplace")}
        >
          <Store size={16} /> Market
        </button>

        <button
          className={`btn ${currentView === "cart" ? "btn-primary" : "btn-ghost"}`}
          onClick={() => setCurrentView("cart")}
          style={{ position: "relative" }}
        >
          <ShoppingCart size={16} /> Cart
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>

        <button
          className={`btn ${currentView === "list_item" ? "btn-primary" : "btn-ghost"}`}
          onClick={() => setCurrentView("list_item")}
        >
          <PlusCircle size={16} /> List Item
        </button>

        <button
          className={`btn ${currentView === "wallet" ? "btn-primary" : "btn-ghost"}`}
          onClick={() => setCurrentView("wallet")}
        >
          <User size={16} /> Account
        </button>

        {/* Theme Toggle Button using pure Theme Context */}
        <button
          onClick={toggleTheme}
          className="btn btn-ghost"
          title="Toggle Theme"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
