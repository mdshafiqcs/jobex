import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { routes } from '@/constants';
import { jobService } from '@/services';
import { helper } from '@/utils';
import { useQuery } from '@tanstack/react-query';

import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { JobActionButton } from '.';
// import { CompanyActionButton } from './index';


function JobTable() {
  

  const companies = useSelector(state => state.company.companies);

  const {data} = useQuery({
    queryKey: ['recruiter-jobs'],
    queryFn: async () => await jobService.getRecruiterAllJobs({currentPage: 1, limit: 200}),
  })

  console.log("data = ", data);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead> SL </TableHead>
            <TableHead> Title </TableHead>
            <TableHead> Company </TableHead>
            <TableHead> Deadline </TableHead>
            <TableHead> Applicants </TableHead>
            <TableHead> Action </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.jobs && 
            data.jobs.map((item, index) => (
                <TableRow  key={item._id}>
                  <TableCell className="text-slate-600">{index + 1}</TableCell>

                  <TableCell className="text-slate-600"> 
                    { item.title }
                  </TableCell >

                  <TableCell className="text-slate-600"> {item?.company?.name || ""} </TableCell >
                  
                  <TableCell className="text-slate-600"> 
                    { helper.getDate(item.deadline) }
                  </TableCell >

                  <TableCell className="text-slate-600"> 
                    { helper.formatNumber(item.applicationCount) }
                  </TableCell >

                  <TableCell > 
                    <JobActionButton job={item} />
                  </TableCell>
                </TableRow>
            ))
          }
          
        </TableBody>
      </Table>
    </div>
  )
}

export default JobTable