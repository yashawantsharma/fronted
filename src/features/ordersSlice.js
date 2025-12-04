import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [], 
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload); 
    },

    cancelOrder: (state, action) => {
      state.orders = state.orders.filter(
        (order) => order.id !== action.payload
      );
    },

    clearOrders: (state) => {
      state.orders = [];
    },
  },
});

export const { addOrder, cancelOrder, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
