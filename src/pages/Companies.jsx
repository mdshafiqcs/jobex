import React from 'react'
import { CompanyTable, SearchBar } from '@/components/app/recruiter/companies'
import useGetCompanies from '@/hooks/useGetCompanies'

function Companies() {
  useGetCompanies();
  return (
    <div className='my-10'>
      <SearchBar />
      <CompanyTable />
    </div>
  )
}

export default Companies