import React, { useCallback, useEffect, useState } from 'react'
import { FilterCard, JobCard } from '@/components/app/jobs'
import { useDispatch, useSelector } from 'react-redux';
import { jobService } from '@/services';
import { addJobs } from '@/store/jobSlice';
import { getErrMsg } from '@/utils';
import { useGetJobs } from '@/hooks';
import { Loader2 } from 'lucide-react';

function Jobs() {
  const dispatch = useDispatch();

  const jobs = useSelector(state => state.job.allJob) || []

  const [currentPage, setCurrentPage] =  useState(1);
  const [limit, setLimit] =  useState(9);

  const {loading,  paginateOption } = useGetJobs({currentPage, limit})


  return (

    <div className='pb-4'>

        {loading ?
        <div className='flex justify-center items-center h-80 mx-auto'>
        <Loader2 className="mr-2 h-8 w-8 text-center animate-spin duration-1000"/>
        </div>
        : 
          jobs.length <= 0 ? <div className='text-center p-4'>No jobs found</div> :
          <div className=' p-1 pb-10 pt-3'>
            <h1 className='mb-2 font-medium text-slate-700'>Search Result: ({paginateOption?.itemCount || 0})</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3'>
              {
                jobs.map((job) => (
                  <div key={job._id}>
                    <JobCard job={job}/>
                  </div>
                ))
              }
            </div>
          </div>
        }
    </div>

    // <div className='flex gap-5 mx-auto mt-5'>
    //   <div className='w-[20%]'>
    //     <FilterCard/>
    //   </div>
    //     {loading ?
    //     <div className='flex justify-center items-center h-80 mx-auto'>
    //     <Loader2 className="mr-2 h-8 w-8 text-center animate-spin duration-1000"/>
    //     </div>
    //     : 
    //       jobs.length <= 0 ? <div className='text-center p-4'>No jobs found</div> :
    //       <div className='flex-1 h-[88vh] overflow-y-auto p-4 pb-10 pt-0'>
    //         <h1 className='mb-2 font-medium text-slate-700'>Search Result: ({paginateOption?.itemCount || 0})</h1>
    //         <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3'>
    //           {
    //             jobs.map((job) => (
    //               <div key={job._id}>
    //                 <JobCard job={job}/>
    //               </div>
    //             ))
    //           }
    //         </div>
    //       </div>
    //     }
    // </div>
  )
}

export default Jobs