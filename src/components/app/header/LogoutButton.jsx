import React, { useState } from 'react'
import { Loader2 } from "lucide-react"
import { handleLogout } from '@/utils';
import { useNavigate } from 'react-router-dom';


function LogoutButton({closePopover }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const logout = async () => {

    setLoading(true);

    await handleLogout(
      () => {
        closePopover()
        setLoading(false)

      },
      true,
      navigate,
    )

  }

  return (
    <button className="flex items-center px-4 py-1 pb-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md w-full text-start " onClick={logout}>
      {
        loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> please wait</>  : <span>Logout</span>
      }
    </button>
  )
}

export default LogoutButton