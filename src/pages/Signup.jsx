import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup } from '@radix-ui/react-radio-group';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import {routes} from '@/constants';
import { authService } from '@/services';
import { getErrMsg } from '@/utils';
import { toast } from 'sonner';
import { LoadingButton } from '@/components';

function Signup() {
  
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({role: "", api: ""});
  
  const {register, handleSubmit} = useForm({
    defaultValues: {fullname: "",email: "", password: "", role: ""}
  });

  const submit = async(data) => {

    setError((err) => ({...err, api: ""}))

    if(!data.role){
      return setError((err) => ({...err, role: "Please select a role ( Job Seeker or Recruiter )"}));
    }

    setLoading(true);

    try {
      const response = await authService.register(data);
      if(response?.success){
        toast.success(response?.message)
        
        navigate(routes.login);
      } else{
        setError((err) => ({...err, api: "Something went wrong"}));
      }
    } catch (e) {
      console.log(e);
      setError((err) => ({...err, api: getErrMsg(e)}));

    } finally{
      setLoading(false);
    }
  }

  return (
    <div className='mt-10 flex justify-center'>
      <div className='w-full max-w-lg p-5 border rounded-xl shadow-md'>
        <h2 className='text-center text-xl mb-3'>Create new Account</h2>
        <form onSubmit={handleSubmit(submit)} >
          <Label htmlFor="fullname">Full Name</Label>
          <Input 
          type="text" 
          id="fullname" 
          placeholder="Enter your full name" 
          className="boder-2 mb-3 mt-1"
          {...register('fullname', {required: true})}
          />

          <Label htmlFor="email">Email</Label>
          <Input 
          type="email" 
          id="email" 
          placeholder="Enter your email" 
          className="boder-2 mb-3 mt-1"
          {...register('email', {required: true})}
          />

          <Label htmlFor="password">Password</Label>
          <Input 
          type="password" 
          id="password" 
          placeholder="Enter your password" 
          className="boder-2 mb-3 mt-1"
          {...register('password', {required: true})}
          />

          <RadioGroup className='flex gap-5'>
            <div className="flex  items-center space-x-2">
              <Input
              type="radio"
              id="jobseeker"
              value="jobseeker"
              className="w-5 h-5 "
              {...register('role')}
              onChange={() => setError((err) => ({...err, role: ""}))}
              />
              <Label htmlFor="jobseeker">Job Seeker</Label>
            </div>
            <div className="flex items-center space-x-2">
            <Input
              type="radio"
              id="recruiter"
              value="recruiter"
              className="w-5 h-5"
              {...register('role')}
              onChange={() => setError((err) => ({...err, role: ""}))}
              />
              <Label htmlFor="recruiter">Recruiter</Label>
            </div>
          </RadioGroup>

          <div className='mt-2'>
            {
              Object.keys(error).map((key) => (
                error[key] ? (<span className='text-red-600 text-sm' key={key}>{error[key]}</span>): null
              ))
            }

          </div>

          <LoadingButton text="Submit" loading={loading} />

        </form>

        <p className='text-sm mt-2'>already have an account? &nbsp; 
          <span className='text-orange-700'>
            <Link to={routes.login}>Login Now</Link>
          </span>
        </p>
        
      </div>
      
    </div>
  )
}

export default Signup