import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem("unitrade_user")) || null,
  cart: JSON.parse(localStorage.getItem("unitrade_cart")) || [],
  currentView: JSON.parse(localStorage.getItem("unitrade_user")) ? "home" : "auth",
  items: []
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      if (action.payload) {
        localStorage.setItem("unitrade_user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("unitrade_user");
      }
    },
    setCart: (state, action) => {
      state.cart = action.payload;
      localStorage.setItem("unitrade_cart", JSON.stringify(action.payload));
    },
    setCurrentView: (state, action) => {
      state.currentView = action.payload;
    },
    setItems: (state, action) => {
      state.items = action.payload;
    }
  }
});

export const { setUser, setCart, setCurrentView, setItems } = appSlice.actions;
export default appSlice.reducer;