import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { routes } from '@/constants'
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import LogoutButton from './LogoutButton'
import { useSelector } from 'react-redux'


function AvatarButton() {

  const user = useSelector(state => state.auth.userData);
  const src = user?.profile?.profilePhoto || "https://github.com/shadcn.png";
  const char = user?.fullname ? user.fullname[0] : "U";

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open) => {
    setIsOpen(open);
  };

  const closePopover = () => {
    setIsOpen(false); // Close the popover when a menu item is clicked
  };

  return (
    
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger>
      <div className='border border-slate-200 rounded-full p-1'>
        <Avatar className="w-7 h-7">
          <AvatarImage src={src} />
          <AvatarFallback className=" flex items-center justify-center w-full h-full rounded-full bg-blue-500 border text-white border-blue-300 box-border p-2 text-sm">
            {char.toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
      </PopoverTrigger>
      <PopoverContent className="p-0 max-w-40 bg-white shadow-md rounded-lg">
        <ul >
          <li>
            
            <Link to={routes.profile} className="block px-4 py-1.5 pt-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md" onClick={closePopover}>
              View Profile
            </Link>
          </li>
          <li>
            <LogoutButton closePopover={closePopover}/>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
    
  )
}

export default AvatarButton