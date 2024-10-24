import React from 'react'

function PageWrapper({children}) {
  return (
    <div className='max-w-7xl mx-auto w-full px-4 pt-16 pb-7'>
      {children}
    </div>
  )
}

export default PageWrapper