import { routes } from '@/constants';
import { Loader2 } from 'lucide-react';
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


export default function AuthLayout({children, authRequired = true}) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    if(authRequired && isLoggedIn !== authRequired){
      navigate(routes.login);
    } else if(!authRequired && isLoggedIn !== authRequired){
      navigate("/");
    }
    setLoading(false);
  }, [authRequired, isLoggedIn, navigate])

  return (
    loading ? <div className='flex justify-center items-center h-80'>
    <Loader2 className="mr-2 h-8 w-8 animate-spin duration-1000"/>
    </div>  : <>  {children} </>
  )
}
