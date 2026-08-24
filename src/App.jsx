import React, { useState } from "react";
import "./App.css";
import { defaultItems } from "./data/items";

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
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem("unitrade_items")) || defaultItems);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("unitrade_cart")) || []);
  const [currentView, setCurrentView] = useState(user ? "home" : "auth");

  const handleSetUser = (newUser) => {
    setUser(newUser); 
    if (newUser) {
      localStorage.setItem("unitrade_user", JSON.stringify(newUser)); 
    } else {
      localStorage.removeItem("unitrade_user"); 
    }
  };

  const handleSetItems = (newItems) => {
    setItems(newItems);
    localStorage.setItem("unitrade_items", JSON.stringify(newItems));
  };

  const handleSetCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("unitrade_cart", JSON.stringify(newCart));
  };

  return (
    <div className="app-container">
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
          />
        )}
        {currentView === "cart" && (
          <CartView 
            user={user} 
            setUser={handleSetUser} 
            cart={cart} 
            setCart={handleSetCart} 
            items={items} 
            setItems={handleSetItems} 
            setCurrentView={setCurrentView} 
          />
        )}
        {currentView === "list_item" && (
          <ListNewView 
            user={user} 
            items={items} 
            setItems={handleSetItems} 
            setCurrentView={setCurrentView} 
          />
        )}
        {currentView === "wallet" && (
          <AccountView 
            user={user} 
            setUser={handleSetUser} 
            setCurrentView={setCurrentView} 
          />
        )}
      </main>
    </div>
  );
}

export default App;