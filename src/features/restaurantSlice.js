import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRestaurants = createAsyncThunk(
  "restaurants/fetchRestaurants",
  async () => {
    const res = await axios.get("https://backend1-hv8q.onrender.com/find");



    return res.data;
  }
);

const initialState = {
  data: [],
  filteredData: [],
  selected: "",
  searchText: "",
  loading: false,
};

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState,

  reducers: {
    setSelectedRestaurant: (state, action) => {
      state.selected = action.payload;
      restaurantSlice.caseReducers.applyFilters(state);
    },

    setSearchText: (state, action) => {
      state.searchText = action.payload.toLowerCase();
      restaurantSlice.caseReducers.applyFilters(state);
    },


    applyFilters: (state) => {
      const search = state.searchText;
      const selected = state.selected;

      state.filteredData = state.data.filter((item) => {
        const name = item?.name?.toLowerCase() || "";

        const matchSearch = name.includes(search);
        const matchDropdown = selected ? item.name === selected : true;

        return matchSearch && matchDropdown;
      });
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.filteredData = action.payload;
      })

      .addCase(fetchRestaurants.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  setSelectedRestaurant,
  setSearchText,
  applyFilters,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;
