
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { jobService } from '@/services';
import { helper } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { JobActionButton } from '.';


function JobTable() {
  
  const {data} = useQuery({
    queryKey: ['recruiter-jobs'],
    queryFn: async () => await jobService.getRecruiterAllJobs({currentPage: 1, limit: 200}),
  })

  return (
    <Table>
        <TableHeader>
          <TableRow>
            <TableHead> SL </TableHead>
            <TableHead> Title </TableHead>
            <TableHead> Company </TableHead>
            <TableHead className="whitespace-nowrap"> Posted On </TableHead>
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

                  <TableCell className="text-slate-600 whitespace-nowrap"> 
                    { item.title }
                  </TableCell >

                  <TableCell className="text-slate-600 whitespace-nowrap"> {item?.company?.name || ""} </TableCell >
                  
                  <TableCell className="text-slate-600 whitespace-nowrap"> 
                    { helper.getDate(item.createdAt) }
                  </TableCell >

                  <TableCell className="text-slate-600 whitespace-nowrap"> 
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
  )
}

export default JobTable