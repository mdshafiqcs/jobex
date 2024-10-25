import React from 'react'
import { useParams } from 'react-router-dom'

function JobsByCompany() {
  const {companyId} = useParams();
  return (
    <div>CompanyId = {companyId}</div>
  )
}

export default JobsByCompany