
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useSelector } from 'react-redux'
import { ApplyButton } from '.';
import { helper } from '@/utils';
import { useSingleJob } from '@/hooks';
import { cn } from '@/lib/utils';

function JobDetail({job}) {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn) || false;

  const daysLeft = helper.getDaysLeft(job.deadline);

  let daysLeftText = "";

  if (daysLeft === 0) {
    daysLeftText = "Last day";
  } else {
    daysLeftText = `${daysLeft} day${daysLeft > 1 ? 's' : ''} left`;
  }

  return (
    <div className='my-10'>
      {/*  title  */}
      <div className='flex justify-between'>
        <div>
          <h1 className='font-bold text-xl text-slate-600'>{job.title}</h1>
          <div className='flex flex-wrap gap-2 my-2'>
            <Badge className='text-cyan-700' variant="outline">{job.positions} Positions</Badge>
            <Badge className='text-cyan-700' variant="outline">{job.jobType}</Badge>
            <Badge className='text-cyan-700' variant="outline">
              {
                job.isNegotiable ? "Negotiable" : <span>{helper.formatPrice(job.minSalary)} - {helper.formatPrice(job.maxSalary)} Yearly</span>
              }
            </Badge>
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

        <h1 className='font-bold my-1  text-slate-600'>Location: <span className='pl-4 font-normal text-slate-600'> {job.location.name} </span>
        </h1>

        <h1 className='font-bold my-1  text-slate-600'>Office Address: <span className='pl-4 font-normal text-slate-600'> {job.address} </span>
        </h1>

        <h1 className='font-bold my-1  text-slate-600'>Description: <span className='pl-4 font-normal text-slate-600'> {job.description} </span>
        </h1>

        <h1 className='font-bold my-1  text-slate-600'>Experience: <span className='pl-4 font-normal text-slate-600'> {job.experienceLevel} </span>
        </h1>

        <h1 className='font-bold my-1  text-slate-600'>
          Salary: 
          <span className='pl-4 font-normal text-slate-600'> 
            {
              job.isNegotiable ? "Negotiable" : <span>{helper.formatPrice(job.minSalary)} - {helper.formatPrice(job.maxSalary)} Yearly</span>
            }
          </span>
        </h1>

        <h1 className='font-bold my-1  text-slate-600'>Total Applicant: <span className='pl-4 font-normal text-slate-600'> {job.applicationCount} </span>
        </h1>

        <h1 className='font-bold my-1  text-slate-600'>Posted Date: <span className='pl-4 font-normal text-slate-600'> {helper.getDate(job.createdAt)} </span>
        </h1>

        <h1 className='font-bold my-1  text-slate-600'>
          Deadline: 
          <span className='pl-4'>{helper.getDate(job.deadline)}</span>
          <span className={cn("pl-2", daysLeft < 3 ? 'text-red-600' : 'text-teal-600')}>( {daysLeftText} )</span>

        </h1>

      </div>



    </div>
  )
}

export default JobDetail