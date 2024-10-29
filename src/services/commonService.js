import endpoints from "@/endpoints";
import axios from "axios";

const getLocations = async() => {

  try {
    const response = await axios.get(
      endpoints.userGetLocations, 
        {
          headers: {
          'Accept': 'application/json',
          }, 
          withCredentials: true,
        }
      );
    
      return response.data.data.locations;
  } catch (error) {
    throw error.response.data; 
  }
}

const getCategories = async() => {

  try {
    const response = await axios.get(
      endpoints.userGetCategories, 
        {
          headers: {
          'Accept': 'application/json',
          }, 
          withCredentials: true,
        }
      );
    
      return response.data.data.categories;
  } catch (error) {
    throw error.response.data; 
  }
}

export default {
  getLocations,
  getCategories,
}