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


const registerCompany = async (formData) => {

  const respnose = await fetch(endpoints.recruiterRegisterCompany, {
    method: "POST",
    credentials:"include",
    body: formData,
  });

  const responseBody = await respnose.json();

  if(!respnose.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
}

const getCompanyById = async (companyId) => {

  try {
    const response = await axios.get(
      endpoints.recruiterCompanyById(companyId),
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
  getAllCompanies,
  registerCompany,
  getCompanyById,
}