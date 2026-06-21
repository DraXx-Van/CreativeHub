import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movie: null,
  theatre: null,
  date: null,
  format: null,
  showTime: null,
  screen: null,
  seats: [],
  totalPrice: null,
  grandTotal: null,
};

const bookingSlice = createSlice({
  name: "booking",

  initialState,

  reducers: {
    setMovie: (state, action) => {
      state.movie = action.payload;
    },

    setTheatre: (state, action) => {
      state.theatre = action.payload;
    },

    setDate: (state, action) => {
      state.date = action.payload;
    },

    setFormat: (state, action) => {
      state.format = action.payload;
    },
    
    setScreen: (state,action) => {
      state.screen = action.payload;
    },

    setShowTime: (state, action) => {
      state.showTime = action.payload;
    },

    setSeats: (state, action) => {
      state.seats = action.payload;
    },

    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
    
    setGrandTotal: (state, action) => {
      state.grandTotal = action.payload;
    },
  },
});

export const {
  setMovie,
  setTheatre,
  setDate,
  setFormat,
  setShowTime,
  setSeats,
  setScreen,
  setTotalPrice,
  setGrandTotal,
} = bookingSlice.actions;

export default bookingSlice.reducer;