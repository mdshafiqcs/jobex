import { BackButton } from '@/components';
import { Button } from '@/components/ui/button';
import { routes } from '@/constants';
import { cn } from '@/lib/utils';
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function RecruiterSelectCompanyPage() {
  const navigate = useNavigate();

  const companies = useSelector(state => state.company.companies);

  const handleClick = (companyId) => {
    navigate(`${routes.recruiterCreateJob}/${companyId}`);
  }
  return (
    <div className='mt-5'>
      <div className='flex gap-3 mb-5 relative'>
        <BackButton />
        <div className='flex-1'>
          <h1 className=' text-center text-xl font-medium mb-3 text-slate-700'>Select a company</h1>
        </div>
      </div>

      {
        companies.length <= 0 ? 
        <div className='text-center p-4 mt-10'>
          No Company found. Please <Link to={routes.recruiterCreateCompany} className='text-orange-600 hover:underline'>add a company</Link> first.
        </div>  : 

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6'>
        {
          companies &&  companies.map((company) => (
            <div 
            onClick={() => handleClick(company._id)}
            key={company._id}
            className=' min-w-[250px] border-2 w-full bg-slate-200 shadow rounded-lg flex flex-col gap-3 p-5 justify-center items-center cursor-pointer'
            >
              <div className='w-20 h-20 flex justify-center items-center'>
                <img src={company.logo} alt="company logo"  />
              </div>
              <h1 className='text-lg font-medium text-slate-700'>{company.name}</h1>
            </div>
          ))
        }
      </div>
      }

      
    </div>
  )
}
