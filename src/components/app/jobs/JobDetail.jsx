
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

      <div className='flex justify-between'>
        <div>
          <h1 className='font-bold text-xl md:text-2xl xl:text-3xl text-slate-600'>{job.title}</h1>
          <div className='flex flex-wrap gap-2 my-2'>
            <Badge className='bg-teal-600 hover:bg-teal-700' >{job.positions} Positions</Badge>
            <Badge className='bg-teal-600 hover:bg-teal-700' >{job.jobType}</Badge>
            <Badge className='bg-teal-600 hover:bg-teal-700' >
              {
                job.isNegotiable ? "Negotiable" : <span>{helper.formatPrice(job.minSalary)} - {helper.formatPrice(job.maxSalary)} Yearly</span>
              }
            </Badge>
          </div>
        </div>
        <ApplyButton job={job} className="hidden md:inline-block" />
      </div> 
 

      <h1 className='font-bold text-slate-600 mt-5 mb-2 text-sm: sm:text-md'>Job Description</h1>
      <hr />

      <div>
        <h1 className='font-bold my-1 text-slate-600 text-sm: sm:text-md '>Role: <span className='pl-4 text-cyan-700'> {job.jobRole || "N/A"} </span>
        </h1>

          <div className='flex flex-wrap gap-2 mb-2 items-center  '>
            <div className='font-bold my-1  text-slate-600 text-sm: sm:text-md'>Skills Required:</div>
            <div className='flex gap-2 flex-wrap' >
              {
                job.requirements.map((skill) => (
                  <Badge key={skill} className="bg-teal-600 hover:bg-teal-700">{skill}</Badge>
                  
                ))
              }
              
              
            </div>
            
          </div>

        <h1 className='font-bold mb-5  text-slate-600 text-sm: sm:text-md'>Description: <span className='pl-4 font-normal text-slate-600'> {job.description} </span>
        </h1>

        <h1 className='font-bold my-1  text-slate-600 text-sm: sm:text-md' >Location: <span className='pl-4 font-normal text-slate-600'> {job.location.name} </span>
        </h1>

        <h1 className='font-bold my-1  text-slate-600 text-sm: sm:text-md'>Office Address: <span className='pl-4 font-normal text-slate-600'> {job.address} </span>
        </h1>

        

        <h1 className='font-bold my-1  text-slate-600 text-sm: sm:text-md'>Experience: <span className='pl-4 font-normal text-slate-600'> {job.experienceLevel} </span>
        </h1>

        <h1 className='font-bold my-1  text-slate-600 text-sm: sm:text-md'>
          Salary: 
          <span className='pl-4 font-normal text-slate-600'> 
            {
              job.isNegotiable ? "Negotiable" : <span>{helper.formatPrice(job.minSalary)} - {helper.formatPrice(job.maxSalary)} Yearly</span>
            }
          </span>
        </h1>

        <h1 className='font-bold my-1  text-slate-600 text-sm: sm:text-md'>Total Applicant: <span className='pl-4 font-normal text-slate-600'> {job.applicationCount} </span>
        </h1>

        <h1 className='font-bold my-1  text-slate-600 text-sm: sm:text-md'>Posted Date: <span className='pl-4 font-normal text-slate-600'> {helper.getDate(job.createdAt)} </span>
        </h1>

        <h1 className='font-bold my-1  text-slate-600 text-sm: sm:text-md'>
          Deadline: 
          <span className='pl-4'>{helper.getDate(job.deadline)}</span>
          <span className={cn("pl-2", daysLeft < 3 ? 'text-red-600' : 'text-teal-600')}>( {daysLeftText} )</span>

        </h1>

      </div>

      <div className='flex justify-center my-10'>
        <ApplyButton job={job} className=" min-w-[70%] md:hidden" />
      </div>



    </div>
  )
}

export default JobDetail