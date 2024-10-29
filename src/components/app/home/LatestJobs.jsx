import React from 'react'
import { useSelector } from 'react-redux'
import { JobCard } from '@/components/app/jobs';
import { useGetJobs } from '@/hooks';
import { Loader2 } from 'lucide-react';


function LatestJobs() {

  const jobs = useSelector(state => state.job.allJob) || []
  
  const {loading} = useGetJobs(1, 6);

  return (
    <div className=' my-20'>
      <h1 className='text-2xl sm:text-3xl font-bold text-slate-700'><span className='text-orange-700'>Latest</span> Job Opennings</h1>
      
      {
        loading ? 
        <div className='flex justify-center items-center h-80 mx-auto'>
        <Loader2 className="mr-2 h-8 w-8 text-center animate-spin duration-1000"/>
        </div>
        : 
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 my-5'>
          { 
            jobs.slice(0,6).map((job) => (
              <JobCard key={job._id} job={job}/>
            ))
          }
        </div>
      }
      
    </div>
  )
}

export default LatestJobs