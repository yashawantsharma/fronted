import { configureStore } from "@reduxjs/toolkit";
import restaurantsReducer from "../features/restaurantSlice";
import themeReducer from "../features/themeSlice"; 
import viewReducer from "../features/viewSlice"; 
import ordersReducer  from "../features/ordersSlice";
import CartReducer from "../features/cartSlice"
import likedReducer from "../features/likedSlice"
import orderReducer from "../features/orderSlice"
import chatReducer from "../features/chatSlice"
import sidebarReducer from "../features/sidebarSlice"
export const store = configureStore({
  reducer: {
    restaurants: restaurantsReducer,
     theme: themeReducer,
     view: viewReducer, 
     orders:ordersReducer,
     cart:CartReducer,
     liked:likedReducer,
     order: orderReducer, 
     chat:  chatReducer,
     sidebar: sidebarReducer,
  },
});
