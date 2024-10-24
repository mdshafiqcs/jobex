import React from 'react'
import { Link } from 'react-router-dom'


function Logo() {
  return (
    <Link to="/">
      <div className='font-bold text-2xl text-slate-600 cursor-pointer'>Job<span className='text-orange-700'>Ex</span></div>
    </Link>
  )
}

export default Logo