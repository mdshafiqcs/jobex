import React from 'react'
import { Logo } from '../../../components'
import Navbar from './Navbar'
import AvatarButton from './AvatarButton'
import AuthButton from './AuthButton'
import { useSelector } from 'react-redux'


function Header() {

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <div className='fixed w-full z-10'>
      <header className='flex bg-white max-w-7xl justify-between items-center mx-auto w-full p-4'>
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
  )
}

export default Header