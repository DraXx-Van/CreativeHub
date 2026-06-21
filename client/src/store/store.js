import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./bookingSlice";
import authReducer from "./authSlice";
import wishlistReducer from "./wishlistSlice";

// Load state from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("bookingState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Save state to local storage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("bookingState", serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
    auth: authReducer,
    wishlist: wishlistReducer,
  },
  preloadedState,
});

// Subscribe to store changes and save to local storage
store.subscribe(() => {
  saveState({
    booking: store.getState().booking,
    auth: store.getState().auth,
    wishlist: store.getState().wishlist,
  });
});