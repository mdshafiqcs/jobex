import endpoints from "@/endpoints";
import axios from "axios";

const getApplicationsByJobId = async({jobId, currentPage = 1, limit = 9}) => {

  try {
    const response = await axios.get(
      endpoints.recruiterApplicationsByJobId({jobId, currentPage, limit}), 
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

export default {
  getApplicationsByJobId
}