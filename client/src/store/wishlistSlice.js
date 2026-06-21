import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [], // Array of full movie objects
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const movie = action.payload;
      const exists = state.movies.find((m) => m._id === movie._id);
      if (exists) {
        state.movies = state.movies.filter((m) => m._id !== movie._id);
      } else {
        state.movies.push(movie);
      }
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
