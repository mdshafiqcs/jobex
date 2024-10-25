import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import React from 'react'

export default function HeroSearchBox() {
  return (
    <div className='flex min-w-[400px] md:w-[70%] xl:w-[50%] h-[50px] shadow-lg border border-slate-200 pl-3 rounded-full items-center gap-4 mx-auto mt-5 overflow-hidden'>
      <input 
      type="text" 
      placeholder='search' 
      className='outline-none border-none w-full px-3 text-slate-600' 
      />
      <Button className=" bg-orange-700 hover:bg-orange-600 h-[50px] "><Search className='h-5 w-5 '/></Button>
    </div>
  )
}
