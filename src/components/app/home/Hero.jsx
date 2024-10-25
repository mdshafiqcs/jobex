import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import React from 'react'
import { HeroSearchBox } from './index.js'

function Hero() {
  return (
    <div className='text-center mt-10'>
      <div className='flex flex-col gap-5 mt-5 mb-10'>
        <span className='mx-auto px-4 py-2 rounded-full bg-slate-100 text-sky-700 font-medium'>
          No. 1 Job Searching Platform
        </span>
        <div className='text-5xl md:text-6xl xl:text-7xl  font-bold text-gray-700 space-y-3'>
          <h1>Search, Apply & <br /> </h1>
          <h1>Get Your <span className='text-orange-700'>Dream Job</span></h1>
        </div>
        <p className='text-slate-500 md:text-lg xl:text-xl'>
          50+ Jobs daily posted. 1000+ Employers
        </p>
        <HeroSearchBox />
      </div>
    </div>
  )
}

export default Hero