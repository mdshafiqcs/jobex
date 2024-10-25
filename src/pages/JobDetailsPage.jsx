import React from 'react'
import { useParams } from 'react-router-dom'
import { JobDetail } from '@/components/app/jobs';
import { Loader2 } from 'lucide-react';
import { useSingleJob } from '@/hooks';


function JobDetailsPage() {
  const { jobId } = useParams();
  
  const {job, loading, error} = useSingleJob(jobId);

  if(loading) {
    return <div className='flex justify-center items-center h-80'>
    <Loader2 className="mr-2 h-8 w-8 animate-spin duration-1000"/>
    </div>
  } else if(error) {
    return <div className='text-center p-4 bg-orange-700 text-3xl text-white'>{error}</div>;
  } else if(job) {
    return <JobDetail job = {job}/>;
  } else {
    return <div className='text-center p-4 bg-orange-700 text-3xl text-white'>Job Not found</div>;
  }

}

export default JobDetailsPage