import React from 'react'
import { useParams } from 'react-router-dom';


function CompanyDetails() {
  const { companyId } = useParams();
  return (
    <div>companyId: {companyId}</div>
  )
}

export default CompanyDetails