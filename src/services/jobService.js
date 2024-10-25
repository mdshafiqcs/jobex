import endpoints from "@/endpoints";
import { asyncWrapper } from "@/utils";
import axios from "axios";

const getAllJobs = asyncWrapper(async(currentPage = 1, limit = 10, keyword = "") => {
  const response = await axios.get(
    endpoints.userAllJob(currentPage, limit, keyword), 
    {
      headers: {
      'Accept': 'application/json',
      }, 
      withCredentials: true,
    }
  );

  return response.data.data;
})

const getJobById = asyncWrapper(async(jobId) => {

  const response = await axios.get(
    endpoints.userJobById(jobId), 
    {
      headers: {
      'Accept': 'application/json',
      }, 
      withCredentials: true,
    }
  );

  return response.data.data;
})

const getAppliedJobs = asyncWrapper(async(currentPage = 1, limit = 10) => {
  const response = await axios.get(
    endpoints.userAppliedJobs(currentPage, limit), 
    {
      headers: {
      'Accept': 'application/json',
      }, 
      withCredentials: true,
    }
  );

  return response.data.data;
})

const applyJob = asyncWrapper(async(jobId) => {
  const response = await axios.get(
    endpoints.userApplyJob(jobId), 
    {
      headers: {
      'Accept': 'application/json',
      }, 
      withCredentials: true,
    }
  );

  return response.data;
})

export default {
  getAllJobs,
  getJobById,
  getAppliedJobs,
  applyJob,
}