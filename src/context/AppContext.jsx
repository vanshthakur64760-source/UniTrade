import React, { createContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setCart, setCurrentView, setItems } from '../redux/appSlice';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const dispatch = useDispatch();

  // Extract states directly from Redux Store
  const user = useSelector((state) => state.app.user);
  const cart = useSelector((state) => state.app.cart);
  const currentView = useSelector((state) => state.app.currentView);
  const items = useSelector((state) => state.app.items);

  // Wrap Redux dispatch calls inside context handlers
  const handleSetUser = (newUser) => dispatch(setUser(newUser));
  const handleSetCart = (newCart) => dispatch(setCart(newCart));
  const handleSetCurrentView = (newView) => dispatch(setCurrentView(newView));
  const handleSetItems = (newItems) => {
    if (typeof newItems === 'function') {
      dispatch(setItems(newItems(items)));
    } else {
      dispatch(setItems(newItems));
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser: handleSetUser,
        cart,
        setCart: handleSetCart,
        currentView,
        setCurrentView: handleSetCurrentView,
        items,
        setItems: handleSetItems
      }}
    >
      {children}
    </AppContext.Provider>
  );
};