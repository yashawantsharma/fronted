import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light", 
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLight: (state) => {
      state.mode = "light";
    },
    setDark: (state) => {
      state.mode = "dark";
    }
  },
});

export const { toggleTheme, setLight, setDark } = themeSlice.actions;
export default themeSlice.reducer;
