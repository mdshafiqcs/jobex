import { Avatar, AvatarImage } from '@/components/ui/avatar';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CompanyActionButton } from './index';


function CompanyTable() {
  

  const companies = useSelector(state => state.company.companies);

  return (
    <div>
       <Table>
        <TableHeader>
          <TableRow>
            <TableHead> SL </TableHead>
            <TableHead> Logo </TableHead>
            <TableHead> Name </TableHead>
            <TableHead > Action </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            companies.map((item, index) => (
                <TableRow  key={item._id}>
                  <TableCell className="text-slate-600">{index + 1}</TableCell>

                  <TableCell className="text-slate-600"> 
                    {
                      item.logo && <Avatar>
                        <AvatarImage src={item.logo} />
                      </Avatar>
                    }
                  </TableCell >

                  <TableCell className="text-slate-600"> {item.name || ""} </TableCell >

                  <TableCell > 
                    <CompanyActionButton company={item} />
                  </TableCell>
                </TableRow>
            ))
          }
          
        </TableBody>
      </Table>
    </div>
  )
}

export default CompanyTable