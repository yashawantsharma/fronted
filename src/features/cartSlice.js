import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },

  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find((i) => i.name === item.name);

      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ ...item, qty: 1 });
      }
    },

    incrementQty: (state, action) => {
      const name = action.payload;
      const item = state.items.find((i) => i.name === name);
      if (item) item.qty += 1;
    },

    decrementQty: (state, action) => {
      const name = action.payload;
      const item = state.items.find((i) => i.name === name);

      if (item.qty === 1) {
        state.items = state.items.filter((i) => i.name !== name);
      } else {
        item.qty -= 1;
      }
      
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, incrementQty, decrementQty,clearCart } = cartSlice.actions;
export default cartSlice.reducer;
