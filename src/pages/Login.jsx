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
import { storeLogin } from '@/store/authSlice';
import { useDispatch } from 'react-redux';
import { toast } from "sonner"
import { UserRoleEnum } from '@/constants';
import { LoadingButton } from '@/components';



function Login() {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({role: "", api: ""});
  
  const {register, handleSubmit} = useForm({
    defaultValues: {email: "", password: "", role: ""}
  });

  const submit = async(data) => {

    setError((err) => ({...err, api: ""}))

    if(!data.role){
      return setError((err) => ({...err, role: "Please select a role ( Job Seeker or Recruiter )"}));
    }

    setLoading(true);

    try {
      const response = await authService.login(data);
      if(response?.success && response?.data?.user){
        dispatch(storeLogin(response.data.user));
        toast.success(response?.message)
        navigate("/");
      } else{
        setError((err) => ({...err, api: "Something went wrong"}));
      }
    } catch (e) {
      setError((err) => ({...err, api: getErrMsg(e)}));

    } finally{
      setLoading(false);
    }
  }

  return (
    <div className='mt-10 flex justify-center'>
      <div className='w-full max-w-lg p-5 border rounded-xl shadow-md'>
        <h2 className='text-center text-xl mb-3'>Login to continue</h2>
        <form onSubmit={handleSubmit(submit)} >
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
              id={UserRoleEnum.jobseeker}
              value={UserRoleEnum.jobseeker}
              className="w-5 h-5 "
              {...register('role')}
              onChange={() => setError((err) => ({...err, role: ""}))}
              />
              <Label htmlFor={UserRoleEnum.jobseeker}>Job Seeker</Label>
            </div>
            <div className="flex items-center space-x-2">
            <Input
              type="radio"
              id={UserRoleEnum.recruiter}
              value={UserRoleEnum.recruiter}
              className="w-5 h-5"
              {...register('role')}
              onChange={() => setError((err) => ({...err, role: ""}))}
              />
              <Label htmlFor={UserRoleEnum.recruiter}>Recruiter</Label>
            </div>
          </RadioGroup>

          <div className='mt-2'>
            {
              Object.keys(error).map((key) => (
                error[key] ? (<span className='text-red-600 text-sm' key={key}>{error[key]}</span>): null
              ))
            }

          </div>
          <LoadingButton  text="Login" loading={loading}  />

        </form>

        <p className='text-sm mt-2'>dont have an account? &nbsp; 
          <span className='text-orange-700'>
            <Link to={routes.signup}>Signup Now</Link>
          </span>
        </p>
        
      </div>
      
    </div>
  )
}

export default Login