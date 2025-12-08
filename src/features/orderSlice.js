import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
     
    list: [],
    address: null,
  },

  reducers: {
     setAddress: (state, action) => {
      state.address = action.payload;
    },

    placeOrder: (state, action) => {
  state.list.push({
    id: Date.now(),
    ...action.payload,
    date: new Date().toLocaleString(),
    deliveryTime: 30 * 60, 
    status: "Cooking",
  });
},

updateTimer: (state) => {
  state.list.forEach((order) => {
    if (order.deliveryTime > 0) {
      order.deliveryTime--;

      if (order.deliveryTime > 20 * 60) {
        order.status = "Cooking";
      } else if (order.deliveryTime > 5 * 60) {
        order.status = "Out for Delivery";
      } else if (order.deliveryTime > 0) {
        order.status = "Arriving Soon";
      } else {
        order.status = "Delivered";
      }
    }
  });
},

    cancelOrder: (state, action) => {
      state.list = state.list.filter(order => order.id !== action.payload);
    },
  },
});

export const { placeOrder, cancelOrder,setAddress,updateTimer } = orderSlice.actions;
export default orderSlice.reducer;
