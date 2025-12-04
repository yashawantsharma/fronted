import { createSlice } from "@reduxjs/toolkit";

const likedSlice = createSlice({
  name: "liked",
  initialState: {
    items: [],
  },

  reducers: {
    toggleLike: (state, action) => {
      const item = action.payload;
      const exists = state.items.find((i) => i.name === item.name);

   
      if (exists) {
        state.items = state.items.filter((i) => i.name !== item.name);
      }
      
      else {
        state.items.push(item);
      }
    },
  },
});

export const { toggleLike } = likedSlice.actions;
export default likedSlice.reducer;
