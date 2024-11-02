import React from 'react'
import { CompanyTable, SearchBar } from '@/components/app/recruiter/companies'
import useGetCompanies from '@/hooks/useGetCompanies'

function Companies() {
  useGetCompanies();
  return (
    <div className='my-10'>
      <SearchBar />
      <hr className='w-full mb-10' />
      <CompanyTable />
    </div>
  )
}

export default Companies