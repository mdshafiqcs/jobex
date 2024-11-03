import { BackButton, LoadingButton } from '@/components'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import commonService from '@/services/commonService'
import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { format, set } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { toast } from 'sonner'
import { jobService } from '@/services'
import { routes } from '@/constants'
import { getErrMsg } from '@/utils'

// import satements ends 



export default function RecruiterCreateJobPage() {
  const navigate = useNavigate();

  const {data:locations} = useQuery({
    queryKey: ['locations'],
    queryFn: async () => await commonService.getLocations({currentPage: 1, limit: 50}),
  })

  const {data:categories} = useQuery({
    queryKey: ['categories'],
    queryFn: async () => await commonService.getCategories({currentPage: 1, limit: 50}),
  })

  const { companyId } = useParams();

  const companies = useSelector(state => state.company.companies);

  const company = companies.find((company) => company._id === companyId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      requirements: "",
      address: "",
      jobRole: "",
      positions: 0,
      experienceLevel: "",
      minSalary: 0,
      maxSalary: 0,
    }
  });

  const [isNegotiable, setIsNegotiable] = React.useState(false);
  const [selectedLocationId, setSelectedLocationId] = React.useState("");
  const [selectedCategoryId, setSelectedCategoryId] = React.useState("");
  const [selectedJobType, setSelectedJobType] = React.useState("");

  const [inputError, setInputError] = React.useState({
    locationId: "",
    categoryId: "",
    jobType: "",
    deadline: "",
    minSalary: "",
    maxSalary: "",
  });


  const [deadline, setDeadline] = React.useState(null);

  const [isDateDialogOpen, setIsDateDialogOpen] = useState(false);

  const handleDateChange = (value) => {
    setDeadline(value);
    setIsDateDialogOpen(false);
  }

  const handleDateOpenChange = (open) => {
    setIsDateDialogOpen(open);
  };

  const {mutate: postJob, isPending: isLoading} = useMutation({
    mutationKey: ["post-job"],
    mutationFn: jobService.recruiterPostJob,
    onSuccess: (data) => {
      toast.success(data?.message);
      navigate(routes.recruiterJobs);
    },
    onError: (error) => {
      getErrMsg(error, true);
    }
  })

  

  const onSubmit = (data) => {

    const validated = validateData(data);

    if(!validated){
      return;
    }

    const newData = {
      ...data, 
      isNegotiable, 
      deadline: deadline.toISOString(), 
      locationId: selectedLocationId, 
      categoryId: selectedCategoryId, 
      jobType: selectedJobType,
      minSalary: isNegotiable ? undefined : parseInt(data.minSalary),
      maxSalary: isNegotiable ? undefined : parseInt(data.maxSalary),
      positions: parseInt(data.positions),
    }
    postJob(newData);
  }

  const validateData = (data) => {
    if(!selectedLocationId){
      setInputError((err) => ({...err, locationId: "Please select a location"}));
    }

    if(!selectedCategoryId){
      setInputError((err) => ({...err, categoryId: "Please select a category"}));
    }

    if(!selectedJobType){
      setInputError((err) => ({...err, jobType: "Please select a job type"}));
    }

    if(!deadline){
      setInputError((err) => ({...err, deadline: "Please select a Deadline"}));
    }

    if(!isNegotiable) {
      if(!data.minSalary){
        setInputError((err) => ({...err, minSalary: "Please enter mininum salary"}));
      }
      if(!data.maxSalary){
        setInputError((err) => ({...err, maxSalary: "Please enter maximum salary"}));
      }
    }

    if(inputError.locationId || inputError.categoryId || inputError.jobType || inputError.deadline || inputError.minSalary || inputError.maxSalary){
      return false;
    }

    return true;

  }


  return (
    <div className='flex justify-center mt-10'>
      {
        company ? (
          <div className='w-full max-w-2xl p-5 border rounded-xl shadow-md relative'>
          <BackButton className='absolute top-5 left-5' />
          <h2 className='text-center text-lg sm:text-xl md:text-2xl text-orange-600 font-bold'>Post a New Job</h2>
          <form className='mt-5' onSubmit={handleSubmit(onSubmit)}  >
            <p className='flex flex-wrap sm:text-lg  mb-5 text-slate-600'> 
              <span className='mr-2'>Company Name:</span> 
              <span className='font-bold text-teal-600'>{company.name}</span>
            </p>
            
            <Input type="hidden" {...register('companyId')} value={company._id} /> 
            
            <div className='mb-3'>
              <Label>Job Title</Label>
              <Input 
              type="text" 
              id="title" 
              placeholder="ex. Backend Developer" 
              className="boder-2 mt-1"
              {...register('title', {required: "Title is required"})}
              />
              {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
            </div>

            <div className='mb-3'>
              <Label>Description</Label>
              <Textarea 
              type="text" 
              id="description" 
              placeholder="Description" 
              className="boder-2  mt-1"
              {...register('description', {required: "Description is required"})}
              />
              {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
            </div>

            <div className='mb-3'>
              <Label>Recruired Skills (sepearated by comma)</Label>
              <Input 
              type="text" 
              id="requirements" 
              placeholder="ex. Nodejs, Mongodb" 
              className="boder-2 mt-1"
              {...register('requirements', {required: "Skills field is required"})}
              />
              {errors.requirements && <p className='text-red-500'>{errors.requirements.message}</p>}
            </div>

            <div className='flex flex-col sm:flex-row gap-5 mb-3'>
              <div className='flex-1 flex flex-col gap-2'>
                <Label>Location</Label>
                <Select  className="w-full" 
                onValueChange={(value) => {
                  setSelectedLocationId(value);
                  setInputError((err) => ({...err, locationId: ""}));
                }} >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Location" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      locations && locations.map((location) => (
                        <SelectItem key={location._id} value={location._id}>{location.name}</SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
                {inputError.locationId && <p className='text-red-500'>{inputError.locationId}</p>}
              </div>
              <div className='flex-1 flex flex-col gap-2'>
                <Label>Category</Label>
                <Select  className="w-full" 
                onValueChange={(value) => {
                  setSelectedCategoryId(value);
                  setInputError((err) => ({...err, categoryId: ""}));
                }} 
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      categories && categories.map((category) => (
                        <SelectItem key={category._id} value={category._id}>{category.name}</SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
                { inputError.categoryId && <p className='text-red-500'>{inputError.categoryId}</p> }
              </div>
            </div>

            <div className='flex flex-col sm:flex-row items-start gap-5'>
              <div className='flex-1 w-full flex flex-col gap-3 mt-1'>
                  <Label>Job Type</Label>
                  <div>
                    <Select  className="w-full" 
                    onValueChange={(value) => {
                      setSelectedJobType(value);
                      setInputError((err) => ({...err, jobType: ""}));
                    }} 
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Job Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full Time">Full Time</SelectItem>
                        <SelectItem value="Part Time">Part Time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                      </SelectContent>
                    </Select>
                    {inputError.jobType && <p className='text-red-500'>{inputError.jobType}</p>}
                  </div>
              </div>

              <div className='flex-1 mb-3 w-full'>
                <Label>Job Role</Label>
                <Input 
                type="text" 
                id="jobRole" 
                placeholder="ex: Sr. Software Engineer" 
                className="boder-2 mt-1"
                {...register('jobRole', {required: "Job Role is required"})}
                />
                {errors.jobRole && <p className='text-red-500'>{errors.jobRole.message}</p>}
              </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-5 mb-3'>
              <div className='flex-1'>
                <Label>Positions</Label>
                <Input 
                type="number" 
                id="positions" 
                placeholder="ex: 5 " 
                className="boder-2 mt-1"
                min="1"
                step="1"
                {...register('positions', {required: "Positions is required"})}
                />
                {errors.positions && <p className='text-red-500'>{errors.positions.message}</p>}
              </div>

              <div className='flex-1 mb-3'>
                <Label>Experience Level</Label>
                <Input 
                type="text" 
                id="experienceLevel" 
                placeholder="ex: 1yr " 
                className="boder-2 mt-1"
                min="1"
                step="1"
                {...register('experienceLevel', {required: "Expreience Level is required"})}
                />
                {errors.experienceLevel && <p className='text-red-500'>{errors.experienceLevel.message}</p>}
              </div>
            </div>

            <div className=' mb-3'>
              <Label>Office Address</Label>
              <Input 
              type="text" 
              id="address" 
              placeholder="office address" 
              className="boder-2 mt-1"
              {...register('address', {required: "Address is required"})}
              />
              {errors.address && <p className='text-red-500'>{errors.address.message}</p>}
            </div>

            

            <div className='mb-3 flex mt-3 flex-col'>
              <label htmlFor="isNegotiable" className="flex my-5 items-center cursor-pointer">
                <Checkbox
                  id="isNegotiable"
                  defaultChecked={false}
                  onCheckedChange={(e) => setIsNegotiable(e)}
                />
                <span className="ml-2 text-sm sm:text-md">Salary is Negotiable</span>
              </label>

              <div className='flex flex-col sm:flex-row gap-5'>
                <div className='flex-1'>
                  <Label>Minimum Salary ($) (Yearly)</Label>
                  <Input 
                  type="number" 
                  disabled={isNegotiable}
                  id="minSalary" 
                  placeholder="Minimum Salary" 
                  className="boder-2 mb-3 mt-1"
                  min="1"
                  step="1"
                  {...register('minSalary')}
                  />
                  {inputError.minSalary && <p className='text-red-500'>{inputError.minSalary.message}</p>}
                </div>

                <div className='flex-1'>
                  <Label>Maximum Salary ($) (Yearly)</Label>
                  <Input 
                  type="number" 
                  disabled={isNegotiable}
                  id="maxSalary" 
                  placeholder="Minimum Salary" 
                  className="boder-2 mb-3 mt-1"
                  min="1"
                  step="1"
                  {...register('maxSalary')}
                  />
                  {inputError.maxSalary && <p className='text-red-500'>{inputError.maxSalary.message}</p>}
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-2.5 w-full'>
              <Label>Application Deadline</Label>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                <Popover open={isDateDialogOpen} onOpenChange={handleDateOpenChange}>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !deadline && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon />
                      {deadline ? format(deadline, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={deadline}
                      onSelect={handleDateChange}
                      initialFocus
                      
                    />
                  </PopoverContent>
                </Popover>
                {inputError.deadline && <p className='text-red-500'>{inputError.deadline}</p>}
              </div>
              {/* <div></div> */}
            </div>

            <LoadingButton text="Save" loading={isLoading} />

          </form>
        </div>
        ) : (<div className='text-center p-4 bg-orange-700 text-3xl text-white w-full'>Company not found</div>)
      }
      
    </div>
  )
}
