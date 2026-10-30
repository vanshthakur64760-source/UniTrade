import React, { createContext, useContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Global Theme State with localStorage persistence
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("unitrade_theme") || "light";
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      const nextTheme = prev === "light" ? "dark" : "light";
      localStorage.setItem("unitrade_theme", nextTheme);
      return nextTheme;
    });
  };

  // User state with localStorage persistence so reloads don't log you out
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("unitrade_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [cart, setCart] = useState([]);
  const [items, setItems] = useState([]);
  
  // View state: defaults to "home" if logged in, otherwise "auth"
  const [currentView, setCurrentView] = useState(() => {
    return localStorage.getItem("unitrade_user") ? "home" : "auth";
  });

  // Custom setter to automatically sync user state with localStorage
  const handleSetUser = (newUser) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem("unitrade_user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("unitrade_user");
      setCurrentView("auth");
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        user,
        setUser: handleSetUser,
        cart,
        setCart,
        items,
        setItems,
        currentView,
        setCurrentView,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);