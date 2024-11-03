import React from 'react'
import { Logo } from '../../../components'
import Navbar from './Navbar'
import AvatarButton from './AvatarButton'
import AuthButton from './AuthButton'
import { useSelector } from 'react-redux'
import { Menu } from 'lucide-react'
import { useRef } from 'react'
import { X } from 'lucide-react'
import { routes, UserRoleEnum } from '@/constants'
import { NavLink } from 'react-router-dom'
import LogoutButton from './LogoutButton'


function Header() {

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
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

  const menuRef = useRef(null);

  function openMenu() {
    menuRef.current.style.right = "0";
    menuRef.current.style.transition = "0.5s";

  }

  function closeMenu() {
    menuRef.current.style.right = "-350px";
    menuRef.current.style.transition = "0.5s";
  }

  const handleLogout = (success) => {
    if (success) {
      closeMenu();
    }
  }

  return (
    <div className=' sticky top-0 w-full z-10 bg-white shadow-sm'>
      <div className='container'>
        <header className='flex bg-white justify-between items-center mx-auto w-full py-4'>
          <Logo/>
        
          {/* desktop navbar starts  */}
          <nav className='hidden sm:flex gap-12 items-center'>
            <Navbar navItems={navItems}/>
            
            {
              isLoggedIn ?  <AvatarButton/> :  <AuthButton/>
            }
          
          </nav>

           {/* desktop navbar ends  */}


          {/* mobile navbar starts  */}
          <ul ref={menuRef} className=' top-0 right-[-350px] fixed sm:hidden z-10 bg-white shadow-2xl min-w-[200px] h-[100vh] px-4'>
            <X onClick={closeMenu} className=' w-8 h-8 ml-[140px] mt-5 cursor-pointer '/>
              {
                navItems.map((item) => (
                  item.isActive ?
                  <li onClick={closeMenu} key={item.path}>
                    <NavLink to={item.path} className={({ isActive }) =>
                      `block py-2 font-medium transition hover:text-orange-700 lg:p-0 
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
              {
                isLoggedIn ? 
                <>
                  <li onClick={closeMenu} >
                    <NavLink to='/profile' className={({ isActive }) =>
                      `block py-2 font-medium transition hover:text-orange-700 lg:p-0 
                      ${
                        isActive
                          ? "text-orange-700"
                          : "text-gray-700"
                      }`
                    }>
                      Profile
                    </NavLink>
                  </li>

                  {
                    userData && userData.role === UserRoleEnum.jobseeker && (
                      <li onClick={closeMenu} >
                      <NavLink to='/applied-jobs' className={({ isActive }) =>
                        `block py-2 font-medium transition hover:text-orange-700 lg:p-0 
                        ${
                          isActive
                            ? "text-orange-700"
                            : "text-gray-700"
                        }`
                      }>
                        Applied Jobs
                      </NavLink>
                    </li>
                    )
                  }

                

                  <li>
                    <LogoutButton onComplete={handleLogout} className="text-[16px] font-medium hover:bg-white hover:text-orange-700 px-0 " />
                  </li>


                </> : 
                <>
                  <li onClick={closeMenu} >
                    <NavLink to='/login' className={({ isActive }) =>
                      `block py-2 font-medium transition hover:text-orange-700 lg:p-0 
                      ${
                        isActive
                          ? "text-orange-700"
                          : "text-gray-700"
                      }`
                    }>
                      Login
                    </NavLink>
                  </li>
                  <li onClick={closeMenu} >
                    <NavLink to='/signup' className={({ isActive }) =>
                      `block py-2 font-medium transition hover:text-orange-700 lg:p-0 
                      ${
                        isActive
                          ? "text-orange-700"
                          : "text-gray-700"
                      }`
                    }>
                      Signup
                    </NavLink>
                  </li>
                </>
              }
              
              
            </ul>
          {/* mobile navbar ends  */}

          <Menu onClick={openMenu} className='sm:hidden cursor-pointer w-7 h-7' />
          
        </header>
      </div>
    </div>
  )
}

export default Header