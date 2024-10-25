
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import { AuthLayout, PageNotFound, RoleProtectedRoute } from './components'
import { About, Contact, Home, Jobs, Login, PrivacyPolicy, Profile, Signup, TermsCondition } from './pages'
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
