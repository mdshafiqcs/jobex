import React from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

function FilterCard() {

  const filterData = [
    {
      type: "Location",
      items: ["Dhaka", "Chittagong", "Comilla", "Syleth", "Rajshahi", "Barishal", "Rangpur", "Mymenshing"]
    },
    {
      type: "Industry",
      items: ["Web Development", "App Development", "Graphics Design", "Backend Development", "Frontend Development", "Fullstack Development"]
    },
    {
      type: "Salary",
      items: ["10000 - 20000", "21000 - 30000", "31000 - 40000", "41000 - 50000", "50000+"]
    }
  ]

  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg text-slate-700'>Filter Jobs</h1>
      <hr className='mt-3' />
      
      {
        filterData.map((data) => (
          <div key={data.type} className='my-2'>
            <h1 className='font-medium text-lg text-slate-600'>{data.type}</h1>
            <RadioGroup>
            {
              data.items.map(item => (

                <div key={item} className='flex items-center space-x-2'>
                  <RadioGroupItem value={item}/>
                  <Label className="text-slate-600">{item}</Label>
                </div>
              ))
            }
            </RadioGroup>
          </div>
        ))
      }
      
     
    </div>
  )
}

export default FilterCard