import React from 'react'
import { useSelector } from 'react-redux'
import { JobCard } from '@/components/app/jobs';
import { useGetJobs } from '@/hooks';


function LatestJobs() {

  const jobs = useSelector(state => state.job.allJob) || []
  
  useGetJobs(1, 6);

  return (
    <div className=' my-20'>
      <h1 className='text-3xl font-bold text-slate-700'><span className='text-orange-700'>Latest</span> Job Opennings</h1>
      <div className='grid grid-cols-3 gap-4 my-5'>
        {
          jobs.slice(0,6).map((job) => (
            <JobCard key={job._id} job={job}/>
          ))
        }
      </div>
    </div>
  )
}

export default LatestJobs