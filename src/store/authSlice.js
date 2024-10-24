import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  isLoggedIn: false,
  userData: null
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    storeLogin: (state, action) => {
      state.isLoggedIn = true;
      state.userData = action.payload;
    },
    storeLogout: (state, action) => {
      state.isLoggedIn = false;
      state.userData = false;
    },
    storeUser: (state, action) => {
      state.userData = action.payload;
    },
    storeUpdateResume: (state, action) => {
      const newData = JSON.parse(JSON.stringify(state.userData));
      newData.profile.resume = action.payload.resume;
      newData.profile.resumeOriginalName = action.payload.resumeOriginalName;

      state.userData = newData;
    },
  }
})

export const {storeLogin, storeLogout, storeUser, storeUpdateResume} = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;