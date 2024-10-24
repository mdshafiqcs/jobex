import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";


const initialState = {
  allJob: [],
  appliedJobs: [],
}

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    addJobs: (state, action) => {
      const items = action.payload || [];
      state.allJob = items;
    },
    addAppliedJobs: (state, action) => {
      const items = action.payload || [];
      state.appliedJobs = items;
    },

    applyJob: (state, action) => {
      state.allJob = state.allJob.map((job) => {
        
        if(job._id === action.payload.jobId){
          job.applications.push({ ...action.payload, jobId: undefined })
          job.applicationCount += 1;
          return job;
        } 
        return job;
      })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
})

export const { addJobs, addAppliedJobs, applyJob } = jobSlice.actions;

const jobReducer = jobSlice.reducer;

export default jobReducer;
