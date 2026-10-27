import React, { useContext, useState } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { AppContext, AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import AuthViews from "./components/AuthViews";
import HomeViews from "./components/HomeViews";
import MarketView from "./components/MarketView";
import CartView from "./components/CartView";
import ListNewView from "./components/ListNewView";
import AccountView from "./components/AccountView";

function MainContent() {
  const { currentView, user } = useContext(AppContext);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="app-container">
      {user && <Navbar />}

      {toast && (
        <div className={`toast toast-${toast.type} fade-in`} style={{
          position: "fixed", bottom: "20px", right: "20px", zIndex: 1000,
          background: toast.type === "error" ? "#ef4444" : "#10b981",
          color: "white", padding: "12px 20px", borderRadius: "8px", fontWeight: 600,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
        }}>
          {toast.message}
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
    <Provider store={store}>
      <AppProvider>
        <MainContent />
      </AppProvider>
    </Provider>
  );
}