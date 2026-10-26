import React, { useState, useEffect } from "react";
import "./App.css";

// Components
import Navbar from "./components/Navbar";
import AuthViews from "./components/AuthViews";
import HomeViews from "./components/HomeViews";
import MarketView from "./components/MarketView";
import CartView from "./components/CartView";
import ListNewView from "./components/ListNewView";
import AccountView from "./components/AccountView";

function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("unitrade_user")) || null);
  
  // Items fetched from json-server backend
  const [items, setItems] = useState([]);
  
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("unitrade_cart")) || []);
  const [currentView, setCurrentView] = useState(user ? "home" : "auth");

  // Toast notification state
  const [toast, setToast] = useState({ message: "", type: "", visible: false });

  const showToast = (message, type = "success") => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  // Fetch items from json-server backend on component mount
  useEffect(() => {
    fetch("http://localhost:5000/items")
      .then((res) => {
        if (!res.ok) throw new Error("Server response error");
        return res.json();
      })
      .then((data) => {
        setItems(data);
      })
      .catch((err) => {
        console.error("Error fetching items from server:", err);
        showToast("Could not load backend data. Ensure json-server is running.", "error");
      });
  }, []);

  const handleSetUser = (newUser) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem("unitrade_user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("unitrade_user");
    }
  };

  const handleSetCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("unitrade_cart", JSON.stringify(newCart));
  };

  return (
    <div className="app-container">
      {/* Toast Notification Banner */}
      {toast.visible && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}

      {user && (
        <Navbar 
          user={user} 
          currentView={currentView} 
          setCurrentView={setCurrentView} 
          cart={cart} 
        />
      )}
      
      <main className="main-content" style={{ display: 'flex', flexDirection: 'column' }}>
        {currentView === "auth" && (
          <AuthViews 
            setUser={handleSetUser} 
            setCurrentView={setCurrentView} 
            showToast={showToast}
          />
        )}
        {currentView === "home" && (
          <HomeViews 
            user={user} 
            items={items} 
            setCurrentView={setCurrentView} 
          />
        )}
        {currentView === "marketplace" && (
          <MarketView 
            user={user} 
            items={items} 
            cart={cart} 
            setCart={handleSetCart} 
            showToast={showToast}
          />
        )}
        {currentView === "cart" && (
          <CartView 
            user={user} 
            setUser={handleSetUser} 
            cart={cart} 
            setCart={handleSetCart} 
            items={items} 
            setItems={setItems} 
            setCurrentView={setCurrentView} 
            showToast={showToast}
          />
        )}
        {currentView === "list_item" && (
          <ListNewView 
            user={user} 
            items={items} 
            setItems={setItems} 
            setCurrentView={setCurrentView} 
            showToast={showToast}
          />
        )}
        {currentView === "wallet" && (
          <AccountView 
            user={user} 
            setUser={handleSetUser} 
            setCurrentView={setCurrentView} 
            showToast={showToast}
          />
        )}
      </main>
    </div>
  );
}

export default App;