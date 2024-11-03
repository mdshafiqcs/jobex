import { JobSearchBar, JobTable } from '@/components/app/recruiter/jobs'
import React from 'react'

function RecruiterJobs() {
  return (
    <div className='my-10'>
      <JobSearchBar />
      <hr className='w-full mb-10' />
      <JobTable />
    </div>
  )
}

export default RecruiterJobs