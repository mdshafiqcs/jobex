import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { routes } from '@/constants'
import { MoreHorizontal, MoreVertical } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function CompanyActionButton({company}) {

  const [isOpen, setIsOpen] = useState(false);
  const handleOpenChange = (open) => {
    setIsOpen(open);
  };

  const closePopover = () => {
    setIsOpen(false); // Close the popover when a menu item is clicked
  };

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange} >
      <PopoverTrigger>
        <MoreVertical />
      </PopoverTrigger>
      <PopoverContent className="p-0 max-w-40 bg-white shadow-md    rounded-lg">
        <ul >
          {/* <li>
          <Link to={`${routes.recruiterEditCompany}/${company?._id}`} >
            <button className="flex items-center px-4 py-1 pb-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md w-full text-start " >
            <span>Edit</span>
            </button>
          </Link>
          
          </li> */}
          <li>
          <Link to={`${routes.recruiterCompanies}/${company?._id}`} >
            <button className="flex items-center px-4 py-1 pb-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md w-full text-start " >
            <span>Details</span>
            </button>
          </Link>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  )
}

export default CompanyActionButton