import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useParams } from 'react-router-dom';
import { companyService } from '../services';
import { Loader2 } from 'lucide-react';


function CompanyDetails() {
  const { companyId } = useParams();

  const {data, isPending} = useQuery({
    queryKey: ['company'],
    queryFn: async () =>  await companyService.getCompanyById(companyId),
    
  })

  return (
    <div>
      {
        data && data.company && (
          <div className='flex justify-center max-w-xl mx-auto w-full  '>
            <div className=' mt-10 p-5 border border-slate-200 shadow-lg rounded-xl w-full'>
              
              <div className='flex justify-center'>
                <div className='flex flex-col justify-center items-center'>
                  <img src={data.company.logo} alt="company logo" className='h-20 w-auto' />
                  <h1 className='text-2xl font-bold text-orange-600'>{data.company.name}</h1>
                </div>
              </div>

              <div className='mt-5 flex flex-col gap-2.5'>
                <p><span className='font-bold'>Description:</span> {data.company.description} </p>

                <p><span className='font-bold'>Website:</span> {data.company.website}</p>
                <p><span className='font-bold'>Location:</span>  {data.company.location}</p>
              </div>
            </div>

          </div>
        )
      }
      {
        isPending && (
          <div className='flex justify-center items-center w-full h-[60vh]'>
            <Loader2 className='w-8 h-8 text-orange-700 animate-spin' />
          </div>
        )
      }

    </div>
  )
}

export default CompanyDetails