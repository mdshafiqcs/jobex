import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";


const initialState = {
  companies: [],
}

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    addCompanies: (state, action) => {
      const items = action.payload || [];
      state.companies = items;
    },
    addCompany: (state, action) => {
      const item = action.payload ;
      state.companies.push(item);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
})

export const { addCompanies, addCompany } = companySlice.actions;

const companyReducer = companySlice.reducer;

export default companyReducer;
