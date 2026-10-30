import React, { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";

import Navbar from "./components/Navbar";
import AuthViews from "./components/AuthViews";
import HomeViews from "./components/HomeViews";
import MarketView from "./components/MarketView";
import ListNewView from "./components/ListNewView";
import CartView from "./components/CartView";
import AccountView from "./components/AccountView";

function MainApp() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("unitrade_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [currentView, setCurrentView] = useState(() => {
    return localStorage.getItem("unitrade_user") ? "home" : "auth";
  });

  const [cart, setCart] = useState([]);
  const [items, setItems] = useState([]);

  const [toast, setToast] = useState(null);
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSetUser = (newUser) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem("unitrade_user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("unitrade_user");
      setCurrentView("auth");
    }
  };

  const renderView = () => {
    switch (currentView) {
      case "auth":
        return (
          <AuthViews
            setUser={handleSetUser}
            setCurrentView={setCurrentView}
            showToast={showToast}
          />
        );
      case "home":
        return (
          <HomeViews
            user={user}
            setCurrentView={setCurrentView}
          />
        );
      case "marketplace":
        return (
          <MarketView
            items={items}
            setItems={setItems}
            cart={cart}
            setCart={setCart}
            user={user}
            showToast={showToast}
          />
        );
      case "list_item":
        return (
          <ListNewView
            user={user}
            items={items}
            setItems={setItems}
            setCurrentView={setCurrentView}
            showToast={showToast}
          />
        );
      case "cart":
        return (
          <CartView
            user={user}
            setUser={handleSetUser}
            cart={cart}
            setCart={setCart}
            items={items}
            setItems={setItems}
            setCurrentView={setCurrentView}
            showToast={showToast}
          />
        );
      case "account":
      case "wallet":
        return (
          <AccountView
            user={user}
            setUser={handleSetUser}
            setCurrentView={setCurrentView}
            showToast={showToast}
          />
        );
      default:
        return (
          <HomeViews
            user={user}
            setCurrentView={setCurrentView}
          />
        );
    }
  };

  return (
    <div className="app-container">
      {user && (
        <Navbar
          user={user}
          cart={cart}
          currentView={currentView}
          setCurrentView={setCurrentView}
        />
      )}
      <main className="main-content" style={{ padding: "20px" }}>
        {renderView()}
      </main>

      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            padding: "12px 20px",
            borderRadius: "8px",
            background: toast.type === "error" ? "#ef4444" : "#10b981",
            color: "#fff",
            fontWeight: "600",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            zIndex: 9999,
          }}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}