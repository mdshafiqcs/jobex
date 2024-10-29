
import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";


const initialState = {
  keyword: "",
  locationId: "",
  categoryId: "",
  salary: {
    min: undefined, 
    max: undefined,
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
    clearFilter: (state, action) => {
      state.salary = { min: undefined, max: undefined };
      state.locationId = "";
      state.categoryId = "";
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
  setKeyword, 
  setLocationId, 
  setCategoryId, 
  setSalary, 
  clearFilter,
} = searchSlice.actions;

const searchReducer = searchSlice.reducer;

export default searchReducer;
