const baseUrl = import.meta.env.VITE_BASE_URL;

const userUrl = `${baseUrl}/user`
const recruiterUrl = `${baseUrl}/recruiter`

const login = `${baseUrl}/auth/login`;
const register = `${baseUrl}/auth/register`;

// user endpoints

const getUser = userUrl;
const userUpdateProfile = `${userUrl}/update-profile`
const userUpdateResume = `${userUrl}/update-resume`
const userLogout = `${userUrl}/logout`
const userGetLocations = `${userUrl}/common/locations`
const userGetCategories = `${userUrl}/common/categories`

const userAllJob = ({currentPage = 1, limit = 10 }) => {

  return `${userUrl}/job?page=${currentPage}&limit=${limit}`;;
}

const userSearchJob = ({currentPage = 1, limit = 10, keyword, locationId, categoryId, minSalary, maxSalary}) => {

  let url = `${userUrl}/job/search?page=${currentPage}&limit=${limit}`;

  if(keyword) url += `&keyword=${keyword}`;
  if(locationId) url += `&locationId=${locationId}`;
  if(categoryId) url += `&categoryId=${categoryId}`;
  if(minSalary) url += `&minSalary=${minSalary}`;
  if(maxSalary) url += `&maxSalary=${maxSalary}`;

  return url;
}



const userJobById = (jobId) => {
  return `${userUrl}/job/id=${jobId}`;
}

const userApplyJob = (jobId) => {
  return `${userUrl}/application/apply-job/id=${jobId}`;
}

const userAppliedJobs = (currentPage = 1, limit = 10) => {
  return `${userUrl}/application?page=${currentPage}&limit=${limit}`;
}


// recruiter routes

const getRecruiter = recruiterUrl;
const recruiterUpdateProfile = `${recruiterUrl}/update-profile`
const recruiterLogout = `${recruiterUrl}/logout`
const recruiterRegisterCompany = `${recruiterUrl}/company/register`
const recruiterGetLocations = `${recruiterUrl}/common/locations`
const recruiterGetCategories = `${recruiterUrl}/common/categories`

const recruiterAllCompanies = (currentPage = 1, limit = 10, keyword = "") => {
  let url = `${recruiterUrl}/company?page=${currentPage}&limit=${limit}`;

  if(keyword) url += `&keyword=${keyword}`;

  return url;
}

const recruiterCompanyById = (companyId) => {
  return `${recruiterUrl}/company/id=${companyId}`;
}

const recruiterUpdateCompany = (companyId) => {
  return `${recruiterUrl}/company/update/id=${companyId}`;
}

const recruiterPostJob = `${recruiterUrl}/job/post-job`

const recruiterAllJobs = ({currentPage = 1, limit = 10}) => {
  return `${recruiterUrl}/job?page=${currentPage}&limit=${limit}`;
}

const recruiterJobById = (jobId) => {
  return `${recruiterUrl}/job/id=${jobId}`;
}

const recruiterApplicationsByJobId = ({jobId, currentPage = 1, limit = 10}) => {
  return `${recruiterUrl}/application/jobId=${jobId}?page=${currentPage}&limit=${limit}`;
}

const recruiterApplicationById = (applictionId) => {

  return `${recruiterUrl}/application/id=${applictionId}`;
}

const recruiterUpdateApplication = `${recruiterUrl}/application/update`



export default {
  getUser,
  login,
  register,
  userUpdateProfile,
  userUpdateResume,
  userLogout,
  userGetLocations,
  userGetCategories,
  userAllJob,
  userSearchJob,
  userJobById,
  userAppliedJobs,
  getRecruiter,
  recruiterUpdateProfile,
  recruiterLogout,
  recruiterGetLocations,
  recruiterGetCategories,
  recruiterRegisterCompany,
  recruiterAllCompanies,
  recruiterCompanyById,
  recruiterUpdateCompany,
  recruiterPostJob,
  recruiterAllJobs,
  recruiterJobById,
  recruiterApplicationsByJobId,
  recruiterApplicationById,
  recruiterUpdateApplication,
  userApplyJob,
}
