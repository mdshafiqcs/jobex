import { BackButton } from '@/components';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { routes } from '@/constants';
import { useSingleJob } from '@/hooks';
import applicationService from '@/services/applicationService';
import { helper } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function RecruiterApplicationsByJobPage() {

  const { jobId } = useParams();
  
  const {job, loading, error} = useSingleJob(jobId);

  if(loading) {
    return <div className='flex justify-center items-center h-80'>
    <Loader2 className="mr-2 h-8 w-8 animate-spin duration-1000"/>
    </div>
  } else if(error) {
    return <div className='text-center p-4 bg-orange-700 text-3xl text-white'>{error}</div>;
  } else if(job) {
    return <ApplicationsList jobId = {job._id}/>;
  } else {
    return <div className='text-center p-4 bg-orange-700 text-3xl text-white'>Job Not found</div>;
  }


}

function ApplicationsList({jobId}) {

  const {data} = useQuery({
    queryKey: ['recruiter-jobs'],
    queryFn: async () => await applicationService.getRecruiterApplicationsByJobId({jobId, currentPage: 1, limit: 200}),
    retry: false,
  })

  return (
    <div className='mt-5'>
      <div className='mb-6 flex gap-5 items-center'>
        <BackButton />
        <h1 className='text-lg sm:text-xl md:text-2xl font-bold text-orange-600 '>All Applications</h1>
      </div>
  
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead> SL </TableHead>
            <TableHead> Photo </TableHead>
            <TableHead className="whitespace-nowrap"> Applicant Name </TableHead>
            <TableHead className="text-center"> Email </TableHead>
            <TableHead className="text-center"> Skills </TableHead>
            <TableHead className="text-center"> Action </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.applications && 
            data.applications.map((item, index) => (
                <TableRow  key={item._id}>
                  <TableCell className="text-slate-600">{index + 1}</TableCell>

                  <TableCell > 
                    <a target='blank' href={ item.applicant.profilePhoto }>
                      <img className='h-12 w-12' src= { item.applicant.profilePhoto } alt="profile photo" />
                    </a>
                  </TableCell >

                  <TableCell className="text-slate-600 whitespace-nowrap"> 
                    { item.applicant.fullname }
                  </TableCell >

                  <TableCell className="text-slate-600 whitespace-nowrap text-center"> 
                    { item.applicant.email }
                  </TableCell >

                  <TableCell className="text-slate-600 text-center"> 
                    <div className='flex flex-wrap gap-2 justify-center min-w-[300px]'>
                      { 
                        item.applicant.skills.map((item) => (
                          <div key={item}><Badge className="bg-teal-600 whitespace-nowrap hover:bg-teal-700">{item}</Badge></div>
                        ))
                      }
                    </div>
                  </TableCell >

                  <TableCell className="text-center"> 
                  <div>
                    <a target='blank' href={item.applicant.resume} className='text-blue-500 hover:underline cursor-pointer'>
                      <Button className="bg-orange-600 hover:bg-orange-700">
                        View Resume
                      </Button>
                    </a>
                  </div>
                  </TableCell>
                </TableRow>
            ))
          }
          
        </TableBody>
      </Table>
    </div>
  )
}
