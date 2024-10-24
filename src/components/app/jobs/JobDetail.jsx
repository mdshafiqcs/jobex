
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useSelector } from 'react-redux'
import { ApplyButton } from '.';
import { helper } from '@/utils';
import { useSingleJob } from '@/hooks';

function JobDetail({job}) {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn) || false;

  return (
    <div className='my-10'>
      {/*  title  */}
      <div className='flex justify-between'>
        <div>
          <h1 className='font-bold text-xl text-slate-600'>{job.title}</h1>
          <div className='flex flex-wrap gap-2 my-2'>
            <Badge className='text-cyan-700' variant="outline">{job.positions} Positions</Badge>
            <Badge className='text-cyan-700' variant="outline">{job.jobType}</Badge>
            <Badge className='text-cyan-700' variant="outline">{job.salary} LPA</Badge>
          </div>
        </div>
        <ApplyButton job={job} />
      </div> 
      {/* title ends  */}

      <h1 className='font-bold text-slate-600 mt-5 mb-2'>Job Description</h1>
      <hr />

      <div>
        <h1 className='font-bold my-1 text-slate-600'>Role: <span className='pl-4 font-normal text-slate-600'> {job.jobRole || "N/A"} </span>
        </h1>

        <h1 className='font-bold my-1  text-slate-600'>Location: <span className='pl-4 font-normal text-slate-600'> {job.location} </span>
        </h1>

        <h1 className='font-bold my-1  text-slate-600'>Description: <span className='pl-4 font-normal text-slate-600'> {job.description} </span>
        </h1>

        <h1 className='font-bold my-1  text-slate-600'>Experience: <span className='pl-4 font-normal text-slate-600'> {job.experienceLevel} </span>
        </h1>

        <h1 className='font-bold my-1  text-slate-600'>Salary: <span className='pl-4 font-normal text-slate-600'> {job.salary} LPA </span>
        </h1>

        <h1 className='font-bold my-1  text-slate-600'>Total Applicant: <span className='pl-4 font-normal text-slate-600'> {job.applicationCount} </span>
        </h1>

        <h1 className='font-bold my-1  text-slate-600'>Posted Date: <span className='pl-4 font-normal text-slate-600'> {helper.getDate(job.createdAt)} </span>
        </h1>

      </div>



    </div>
  )
}

export default JobDetail