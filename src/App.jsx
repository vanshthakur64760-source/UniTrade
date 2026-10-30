import React, { useContext, useState } from "react";
import { ThemeContext, ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import AuthViews from "./components/AuthViews";
import HomeViews from "./components/HomeViews";
import MarketView from "./components/MarketView";
import CartView from "./components/CartView";
import ListNewView from "./components/ListNewView";
import AccountView from "./components/AccountView";

function MainContent() {
  const { currentView, user, theme } = useContext(ThemeContext);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className={`app-container ${theme}`}>
      {user && <Navbar />}

      {/* Global Toast Notification */}
      {toast && (
        <div className="toast-container">
          <div className={`toast toast-${toast.type} fade-in`}>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      <main className="main-content">
        {currentView === "auth" && <AuthViews showToast={showToast} />}
        {currentView === "home" && <HomeViews showToast={showToast} />}
        {currentView === "marketplace" && <MarketView showToast={showToast} />}
        {currentView === "list_item" && <ListNewView showToast={showToast} />}
        {currentView === "cart" && <CartView showToast={showToast} />}
        {currentView === "wallet" && <AccountView showToast={showToast} />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  );
}
