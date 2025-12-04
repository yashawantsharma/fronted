import { createSlice } from "@reduxjs/toolkit";

const viewSlice = createSlice({
  name: "view",
  initialState: {
    mode: "card", 
  },
  reducers: {
    toggleView: (state) => {
    state.mode = state.mode === "card" ? "table" : "card";
    },
    setView: (state, action) => {
    state.mode = action.payload; 
    },
  },
});

export const { toggleView, setView } = viewSlice.actions;
export default viewSlice.reducer;
