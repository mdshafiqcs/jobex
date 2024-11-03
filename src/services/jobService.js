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

const searchJobs = async({currentPage, limit, keyword, locationId, categoryId, minSalary, maxSalary}) => {

  try {
    const response = await axios.get(
      endpoints.userSearchJob({currentPage, limit, keyword, locationId, categoryId, minSalary, maxSalary}), 
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

const getRecruiterAllJobs = async({currentPage = 1, limit = 9}) => {

  try {
    const response = await axios.get(
      endpoints.recruiterAllJobs({currentPage, limit}), 
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

const recruiterPostJob = async(data) => {

  try {
    const response = await axios.post(
      endpoints.recruiterPostJob, 
      {
        ...data
      },
      {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
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
  searchJobs,
  getRecruiterAllJobs,
  recruiterPostJob,
}