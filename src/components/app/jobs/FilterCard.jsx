import React from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from 'react'

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

  const [selectedValue, setSelectedValue] = useState("");

  const changeHandler = (value) => {
    setSelectedValue(value);
    console.log("value = ", value);
  }

  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg text-slate-700'>Filter Jobs</h1>
      <hr className='mt-3' />
      
      {
        filterData.map((data) => (
          <div key={data.type} className='my-2'>
            <h1 className='font-medium text-lg text-slate-600'>{data.type}</h1>
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
            {
              data.items.map(item => (

                <div key={item} className='flex items-center space-x-2'>
                  <RadioGroupItem id={item} value={item}/>
                  <Label htmlFor={item} className="text-slate-600">{item}</Label>
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