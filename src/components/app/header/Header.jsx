import React from 'react'
import { Logo } from '../../../components'
import Navbar from './Navbar'
import AvatarButton from './AvatarButton'
import AuthButton from './AuthButton'
import { useSelector } from 'react-redux'


function Header() {

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <div className=' sticky w-full z-10 bg-white shadow-sm'>
      <div className='container'>
        <header className='flex bg-white justify-between items-center mx-auto w-full py-4'>
          <Logo/>
          <nav>
            <div className='flex gap-12 items-center'>
              <Navbar/>
              {
                isLoggedIn ?  <AvatarButton/> :  <AuthButton/>
              }
            
            </div>
          </nav>
        </header>
      </div>
    </div>
  )
}

export default Header