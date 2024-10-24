import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {routes} from '@/constants'



function AuthButton() {
  return (
    <div className='flex items-start gap-2'>
      <Link to={routes.login}>
        <Button variant="outline" size="sm" className=" border-orange-200 hover:bg-orange-700 duration-200 hover:border-orange-700 hover:text-white ">
          Login
        </Button>
      </Link>
      
      <Link to={routes.signup}>
        <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
          Signup
        </Button>
      </Link>
      
    </div>
  )
}

export default AuthButton