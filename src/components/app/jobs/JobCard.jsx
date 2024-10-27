import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Link } from 'react-router-dom'
import { routes } from '@/constants'
import { Button } from '../../ui/button'
import { Heart } from 'lucide-react'
import moment from 'moment';
import { useSelector } from 'react-redux'
import { ApplyButton } from '.'
import { helper } from '@/utils'

function JobCard({job}) {
  const timeAgo = moment(job.createdAt).fromNow();

  return (
    
    <div className='bg-white rounded-xl shadow-xl gap-2 p-4 border border-gray-100'>

      <div>
        <h1 className='font-medium text-slate-700'>{job.title}</h1>
        <p className='text-sm text-sky-800'>{job.location.name}</p>
      </div>
      <div>
        
        <h1 className='font-bold text-sm text-slate-600'>{job?.company?.name}</h1>
        <p className='truncate text-sm'>  {job.description}  </p>
      </div>
      <div className='flex flex-wrap gap-2 my-2'>
        <Badge className='text-cyan-700' variant="outline">{job.positions} Positions</Badge>
        <Badge className='text-cyan-700' variant="outline">{job.jobType}</Badge>
        <Badge className='text-cyan-700' variant="outline">
          {
            job.isNegotiable ? "Negotiable" : <span>{helper.formatPrice(job.minSalary)} - {helper.formatPrice(job.maxSalary)} Yearly</span>
          }
        </Badge>
      </div>
      <div className='flex justify-between items-center mt-5'>
        <div className='flex gap-2'>
          <Link to={`${routes.jobs}/${job._id}`} >
            <Button size="sm" className="bg-orange-600 hover:bg-orange-700">Details</Button>
          </Link> 
          <ApplyButton job={job}/>
        </div>
        <Button size="sm" variant="ghost" className="rounded-full"> <Heart/> </Button>
      </div>
      
    </div>
    
  )
}

export default JobCard