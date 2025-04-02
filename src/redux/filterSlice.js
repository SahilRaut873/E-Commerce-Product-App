import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  category: "",
  brand: "",
  rating: 0,
  price: { min: 0, max: 10000 },
  sort: "",
  filters: [],
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setBrand: (state, action) => {
      state.brand = action.payload;
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    removeFilter: (state, action) => {
      state.filters = state.filters.filter((f) => f !== action.payload);
    },
    clearFilters: (state) => {
      state.search = "";
      state.category = "";
      state.brand = "";
      state.rating = 0;
      state.price = { min: 0, max: 10000 };
      state.sort = "";
      state.filters = [];
    },
  },
});

export const { setSearch, setCategory, setBrand, setRating, setPrice, setSort, removeFilter, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;
