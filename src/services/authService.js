
import axios from "axios";
import endpoints from "@/endpoints";
import { asyncWrapper } from "@/utils";
import { store } from "@/store/store";
import { UserRoleEnum } from "@/constants";

const login = asyncWrapper(async({email, password, role}) => {
  const response = await axios.post(
    endpoints.login, 
    {email, password, role}, 
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      withCredentials: true,
    },
  );

  return response.data;
})

const register = asyncWrapper(async({fullname, email, password, role}) => {
  const response = await axios.post(
    endpoints.register, 
    {fullname, email, password, role}, 
    {headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }}
  );

  return response.data;
})

const logout = asyncWrapper(async() => {

  const user = store.getState().auth.userData;

  const url = (user.role === UserRoleEnum.jobseeker) ? endpoints.userLogout : endpoints.recruiterLogout;

  const response = await axios.get(
    url, 
    {
      headers: {
      'Accept': 'application/json',
      }, 
      withCredentials: true,
    }
  );

  return response.data;
})

const user = asyncWrapper(async() => {
  const userData = store.getState().auth.userData;

  const url = (userData.role === UserRoleEnum.jobseeker) ? endpoints.getUser : endpoints.getRecruiter;

  const response = await axios.get(
    url, 
    {headers: {
      'Accept': 'application/json',
    }}
  );

  return response.data;
})

const updateProfile = asyncWrapper(async({fullname, phone, bio, skills, profilePhoto}) => {

  const userData = store.getState().auth.userData;

  const url = (userData.role === UserRoleEnum.jobseeker) ? endpoints.userUpdateProfile : endpoints.recruiterUpdateProfile;

  const formData = new FormData();
  formData.append('fullname', fullname);
  formData.append('phone', phone);
  formData.append('bio', bio);

  if(userData.role === UserRoleEnum.jobseeker){
    formData.append('skills', skills)
  }


  if(profilePhoto && profilePhoto.length > 0){
    formData.append('profilePhoto', profilePhoto[0]);
  }

  const response = await axios.post(
    url, 
    formData, 
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      }, 
      withCredentials: true,
    },
  );

  return response.data;
})


const updateResume = asyncWrapper(async({resume}) => {

  const formData = new FormData();

  if(resume && resume.length > 0){
    formData.append('resume', resume[0]);
  }

  const response = await axios.post(
    endpoints.userUpdateResume, 
    formData, 
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      }, 
      withCredentials: true,
    },
  );

  return response.data;
})



export default {
  login,
  register,
  logout,
  user,
  updateProfile,
  updateResume,
}