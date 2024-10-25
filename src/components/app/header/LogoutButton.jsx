import React, { useState } from 'react'
import { Loader2 } from "lucide-react"
import { handleLogout } from '@/utils';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';


function LogoutButton({closePopover, className, onComplete }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const logout = async () => {

    setLoading(true);

    await handleLogout(
      () => {
        if(closePopover){
          closePopover()
        }

        if(onComplete){
          onComplete(true);
        }
        setLoading(false)

      },
      true,
      navigate,
    )

  }

  return (
    <button className={cn("flex items-center px-4 py-1 pb-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md w-full text-start", className)}
      onClick={logout}>
      {
        loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> please wait</>  : <span>Logout</span>
      }
    </button>
  )
}

export default LogoutButton