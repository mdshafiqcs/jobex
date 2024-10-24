import React from 'react'
import { NavLink } from 'react-router-dom'
import {routes, UserRoleEnum} from '@/constants'
import { useSelector } from 'react-redux'

function Navbar() {

  const userData = useSelector(state => state.auth.userData);


  const navItems = [
    {
      name: "Home",
      path: "/",
      isActive: true
    },
    {
      name: "Find Jobs",
      path: routes.jobs,
      isActive: userData?.role !== UserRoleEnum.recruiter,
    },
    {
      name: "Companies",
      path: routes.recruiterCompanies,
      isActive: userData && userData.role === UserRoleEnum.recruiter,
    },
    {
      name: "Jobs",
      path: routes.recruiterJobs,
      isActive: userData && userData.role === UserRoleEnum.recruiter,
    },
  ]

  return (
    
    <ul className='flex gap-5'>
      {
        navItems.map((item) => (
          item.isActive ?
          <li key={item.path}>
            <NavLink to={item.path} className={({ isActive }) =>
              `block py-2 pr-4 pl-3 font-medium transition hover:text-orange-700 lg:p-0 
              ${
                isActive
                  ? "text-orange-700"
                  : "text-gray-700"
              }`
            }>
              {item.name}
            </NavLink>
          </li> : null
        ))
      }
      
    </ul>
  )
}

export default Navbar