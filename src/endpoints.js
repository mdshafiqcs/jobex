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

const userAllJob = (currentPage = 1, limit = 10, keyword = "") => {
  return `${userUrl}/job?page=${currentPage}&limit=${limit}&keyword=${keyword}`;
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

const recruiterAllCompanies = (currentPage = 1, limit = 10, keyword = "") => {
  return `${recruiterUrl}/company?page=${currentPage}&limit=${limit}&keyword=${keyword}`;
}

const recruiterCompanyById = (companyId) => {
  return `${recruiterUrl}/company/id=${companyId}`;
}

const recruiterUpdateCompany = (companyId) => {
  return `${recruiterUrl}/company/update/id=${companyId}`;
}

const recruiterPostJob = `${recruiterUrl}/job/post-job`

const recruiterAllJobs = (currentPage = 1, limit = 10) => {
  return `${recruiterUrl}/job?page=${currentPage}&limit=${limit}`;
}

const recruiterJobById = (jobId) => {
  return `${recruiterUrl}/job/id=${jobId}`;
}

const recruiterAllApplications = (jobId, currentPage = 1, limit = 10) => {
  return `${recruiterUrl}/application/jobId=${jobId}?page=${currentPage}&limit=${limit}`;
}

const recruiterUpdateApplication = `${recruiterUrl}/application/update`



export default {
  getUser,
  login,
  register,
  userUpdateProfile,
  userUpdateResume,
  userLogout,
  userAllJob,
  userJobById,
  userAppliedJobs,
  getRecruiter,
  recruiterUpdateProfile,
  recruiterLogout,
  recruiterRegisterCompany,
  recruiterAllCompanies,
  recruiterCompanyById,
  recruiterUpdateCompany,
  recruiterPostJob,
  recruiterAllJobs,
  recruiterJobById,
  recruiterAllApplications,
  recruiterUpdateApplication,
  userApplyJob,
}
