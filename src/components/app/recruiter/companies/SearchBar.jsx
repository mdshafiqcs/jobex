import React from 'react'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { routes } from '@/constants';

function SearchBar() {
  const navigate = useNavigate();
  return (
    <div className='my-5 flex items-center justify-between'>
      <div>
        {/* <Input
        type="text"
        placeholder="Filter by name"
        /> */}
        <h1 className='text-lg sm:text-xl md:text-2xl font-bold text-orange-600 '>All Companies</h1>
      </div>
      
      <Link to={routes.recruiterCreateCompany}>
        <Button 
        size="sm" 
        className="bg-orange-600 hover:bg-orange-700"
        >New Company
        </Button>
      </Link>
    </div>
  )
}

export default SearchBar