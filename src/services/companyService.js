import endpoints from "@/endpoints";
import { asyncWrapper } from "@/utils";
import axios from "axios";

const getAllCompanies = asyncWrapper(async(currentPage = 1, limit = 10, keyword="") => {
  const response = await axios.get(
    endpoints.recruiterAllCompanies(currentPage, limit, keyword), 
    {
      headers: {
      'Accept': 'application/json',
      }, 
      withCredentials: true,
    }
  );

  return response.data.data;
})

export default {
  getAllCompanies,
}