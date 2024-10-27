import endpoints from "@/endpoints";
import { asyncWrapper } from "@/utils";
import axios from "axios";

const getAllJobs = async({currentPage = 1, limit = 9}) => {

  try {
    const response = await axios.get(
      endpoints.userAllJob({currentPage, limit}), 
        {
          headers: {
          'Accept': 'application/json',
          }, 
          withCredentials: true,
        }
      );
    
      return response.data.data;
  } catch (error) {
    throw error.response.data; 
  }
}

const getJobById = async(jobId) => {

  try {
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

  } catch (error) {
    throw error.response.data; 
  }

}

const getAppliedJobs = async(currentPage = 1, limit = 10) => {

  try {
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
  } catch (error) {
    throw error.response.data; 
  }
}

const applyJob = async(jobId) => {

  try {
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
  }catch (error) {
    throw error.response.data; 
  }
}

export default {
  getAllJobs,
  getJobById,
  getAppliedJobs,
  applyJob,
}