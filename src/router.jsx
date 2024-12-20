
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import { AuthLayout, PageNotFound, RoleProtectedRoute } from './components'
import { About, AppliedJobsPage, Companies, CompanyDetails, Contact, CreateCompanyPage, EditCompanyPage, Home, JobDetailsPage, Jobs, JobsByCompany, Login, PrivacyPolicy, Profile, RecruiterApplicationsByJobPage, RecruiterCreateJobPage, RecruiterJobDetailsPage, RecruiterJobs, RecruiterSelectCompanyPage, SearchJob, Signup, TermsCondition } from './pages'
import App from './App'
import { routes, UserRoleEnum } from './constants'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Home/>} />

      <Route path={routes.jobs} element={
        <RoleProtectedRoute 
          element={<Jobs />} 
          restrictedRoles={[UserRoleEnum.recruiter]} 
        />
      } />

      <Route path={routes.searchJob} element={
        <RoleProtectedRoute 
          element={<SearchJob />} 
          restrictedRoles={[UserRoleEnum.recruiter]} 
        />
      } />

      <Route path={routes.jobs + "/:jobId"} element={
        <RoleProtectedRoute 
          element={<JobDetailsPage />} 
          restrictedRoles={[UserRoleEnum.recruiter]} 
        />
      } />

      <Route path={routes.appliedJobs} element={
        <AuthLayout authRequired > 
          <RoleProtectedRoute 
            element={<AppliedJobsPage />} 
            restrictedRoles={[UserRoleEnum.recruiter]} 
          />
        </AuthLayout>  
      } />

      <Route path={routes.recruiterJobs} element={( 
        <AuthLayout authRequired > 
          <RoleProtectedRoute 
            element={<RecruiterJobs />} 
            restrictedRoles={[UserRoleEnum.jobseeker, null, undefined, ""]} 
          />
        </AuthLayout>  
      )} />

    
      <Route path={routes.recruiterSelectCompany} element={( 
        <AuthLayout authRequired > 
          <RoleProtectedRoute 
            element={<RecruiterSelectCompanyPage />} 
            restrictedRoles={[UserRoleEnum.jobseeker, null, undefined, ""]} 
          />
        </AuthLayout>  
      )} />

      <Route path={routes.recruiterCreateJob + "/:companyId"} element={( 
        <AuthLayout authRequired > 
          <RoleProtectedRoute 
            element={<RecruiterCreateJobPage />} 
            restrictedRoles={[UserRoleEnum.jobseeker, null, undefined, ""]} 
          />
        </AuthLayout>  
      )} />

      <Route path={routes.recruiterJobs + "/:jobId"} element={( 
        <AuthLayout authRequired > 
          <RoleProtectedRoute 
            element={<RecruiterJobDetailsPage />} 
            restrictedRoles={[UserRoleEnum.jobseeker, null, undefined, ""]} 
          />
        </AuthLayout>  
      )} />

      <Route path={routes.recruiterApplications + "/:jobId"} element={( 
        <AuthLayout authRequired > 
          <RoleProtectedRoute 
            element={<RecruiterApplicationsByJobPage />} 
            restrictedRoles={[UserRoleEnum.jobseeker, null, undefined, ""]} 
          />
        </AuthLayout>  
      )} />

      <Route path={routes.recruiterCompanies} element={( 
        <AuthLayout authRequired > 
          <RoleProtectedRoute 
            element={<Companies />} 
            restrictedRoles={[UserRoleEnum.jobseeker, null, undefined, ""]} 
          />
        </AuthLayout>  
      )} />

      <Route path={routes.recruiterCompanies + "/:companyId"} element={( 
        <AuthLayout authRequired > 
          <RoleProtectedRoute 
            element={<CompanyDetails />} 
            restrictedRoles={[UserRoleEnum.jobseeker, null, undefined, ""]} 
          />
        </AuthLayout>  
      )} />

      <Route path={routes.recruiterCreateCompany} element={( 
        <AuthLayout authRequired > 
          <RoleProtectedRoute 
            element={<CreateCompanyPage />} 
            restrictedRoles={[UserRoleEnum.jobseeker, null, undefined, ""]} 
          />
        </AuthLayout>  
      )} />

      <Route path={routes.recruiterEditCompany + "/:companyId"} element={( 
        <AuthLayout authRequired > 
          <RoleProtectedRoute 
            element={<EditCompanyPage />} 
            restrictedRoles={[UserRoleEnum.jobseeker, null, undefined, ""]} 
          />
        </AuthLayout>  
      )} />

      <Route path={routes.recruiterJobsByCompany + "/:companyId"} element={( 
        <AuthLayout authRequired > 
          <RoleProtectedRoute 
            element={<JobsByCompany />} 
            restrictedRoles={[UserRoleEnum.jobseeker, null, undefined, ""]} 
          />
        </AuthLayout>  
      )} />

      <Route path={routes.profile} element={( <AuthLayout authRequired > <Profile/> </AuthLayout>  )} />
      <Route path={routes.login} element={( <AuthLayout authRequired={false}> <Login/> </AuthLayout>  )} />
      <Route path={routes.signup} element={( <AuthLayout authRequired={false}> <Signup/> </AuthLayout>  )} />
      <Route path={routes.about} element={<About/>} />
      <Route path={routes.contact} element={<Contact/>} />
      <Route path={routes.privacyPolicy} element={<PrivacyPolicy/>} />
      <Route path={routes.termsCondition} element={<TermsCondition/>} />
      <Route path='*' element={<PageNotFound/>} />
    </Route>
  )
)





export default router;
