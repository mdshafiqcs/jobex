
import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";


const initialState = {
  currentPage: 1,
  limit: 10,
  keyword: "",
  locationId: "",
  categoryId: "",
  salary: {
    min: 1000, 
    max: 100000000,
  },
  jobs: [],
}

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addSearchedJobs: (state, action) => {
      const items = action.payload || [];
      state.jobs = items;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload || 1;
    },
    setLimit: (state, action) => {
      state.limit = action.payload || 10;
    },
    setKeyword: (state, action) => {
      state.keyword = action.payload || "";
    },
    setLocationId: (state, action) => {
      state.locationId = action.payload || "";
    },
    setCategoryId: (state, action) => {
      state.categoryId = action.payload || "";
    },
    setSalary: (state, action) => {
      state.salary = {
        min: action.payload?.min || 1000,
        max: action.payload?.max || 100000000,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
})

export const { 
  addSearchedJobs, 
  setCurrentPage, 
  setLimit, 
  setKeyword, 
  setLocationId, 
  setCategoryId, 
  setSalary, 
} = searchSlice.actions;

const searchReducer = searchSlice.reducer;

export default searchReducer;
