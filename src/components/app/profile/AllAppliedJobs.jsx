import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { helper } from '@/utils';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { ApplicationStatusEnum, routes } from '@/constants';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useGetAppliedJobs } from '@/hooks';


function AllAppliedJobs() {

  const appliedJobs = useSelector(state => state.job.appliedJobs) || []
  
  const [currentPage, setCurrentPage] =  useState(1);
  const [limit, setLimit] =  useState(10);

  const { paginateOption } = useGetAppliedJobs({currentPage, limit});

  return (
    <div >
      <h1 className='font-bold text-slate-700 mt-5 mb-3'>
        All Applied Jobs ({paginateOption?.itemCount || 0})
      </h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead> SL </TableHead>
            <TableHead> Date </TableHead>
            <TableHead> Job Role </TableHead>
            <TableHead> Company </TableHead>
            <TableHead> Status </TableHead>
            <TableHead> Action </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            appliedJobs.map((item, index) => (
                <TableRow  key={item._id}>
                  <TableCell className="text-slate-600">{index + 1}</TableCell>
                  <TableCell className="text-slate-600"> {helper.getDate(item.createdAt)} </TableCell >
                  <TableCell className="text-slate-600"> {item.job?.title} </TableCell>
                  <TableCell className="text-slate-600 font-medium"> {item.job?.company?.name} </TableCell>
                  <TableCell> 
                    <Badge className={`${item.status === ApplicationStatusEnum.pending ? "bg-amber-500 hover:bg-amber-600" : item.status === ApplicationStatusEnum.accepted ? "bg-teal-600 hover:bg-teal-700" : "bg-red-600 hover:bg-red-700"}`}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell> 
                    <Link to={`${routes.jobs}/${item?.job?._id}`} >
                      <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                        Details
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
            ))
          }
          
        </TableBody>
      </Table>
    </div>
  )
}

export default AllAppliedJobs