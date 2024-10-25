import { LoadingButton } from '@/components';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea';
import { companyService } from '@/services';
import { getErrMsg } from '@/utils';
import { useMutation } from '@tanstack/react-query';
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function CreateCompanyPage() {

  const navigate = useNavigate();
  
  const {mutate: registerCompany, isPending: isLoading} = useMutation({
    mutationFn: companyService.registerCompany,
    onSuccess: () => {
      toast.success("Company Registered successfully")
      navigate("/rc/company")
    },
    onError: (error) => {
      getErrMsg(error, true);
    }
  })

  const {register, handleSubmit, formState: {errors}} = useForm({
    defaultValues:{
      name: "",
      description: "",
      website: "",
      location: "",
    }
  });

  const onSubmit = (data) => {
    registerCompany(data);
  }

  return (
    <div className='flex justify-center mt-10'>
      <div className='w-full max-w-2xl p-5 border rounded-xl shadow-md'>
        <h2 className='text-center text-xl text-orange-600 font-bold'>Add New Company</h2>
        <p className='text-center'>You can not change company name later</p>
        <form className='mt-5' onSubmit={handleSubmit(onSubmit)} >

          <div>
            <Label>Company Name</Label>
            <Input 
            type="text" 
            id="name" 
            placeholder="Company Name" 
            className="boder-2 mb-3 mt-1"
            {...register('name', {required: "Company Name is required"})}
            />
            {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
          </div>
          <div>
            <Label>Description</Label>
            <Textarea 
            type="text" 
            id="description" 
            placeholder="Description" 
            className="boder-2 mb-3 mt-1"
            {...register('description')}
            />
          </div>

          <div>
            <Label>Website</Label>
            <Input 
            type="text" 
            id="website" 
            placeholder="Website Url" 
            className="boder-2 mb-3 mt-1"
            {...register('website', {required: "Website Url is required"})}
            />
            {errors.website && <p className='text-red-500'>{errors.website.message}</p>}
          </div>

          <div>
            <Label>Location</Label>
            <Input 
            type="text" 
            id="location" 
            placeholder="company location" 
            className="boder-2 mb-3 mt-1"
            {...register('location', {required: "company location is required"})}
            />
            {errors.location && <p className='text-red-500'>{errors.location.message}</p>}
          </div>

          <div>
            <Label>Logo</Label>
            <Input 
            type="file" 
            id="logo" 
            placeholder="company logo" 
            className="boder-2 mb-3 mt-1"
            {...register('logo', {required: "company logo is required"})}
            />
            {errors.logo && <p className='text-red-500'>{errors.logo.message}</p>}
          </div>

          <LoadingButton text="Save" loading={isLoading} />

        </form>
      </div>
    </div>
  )
}

export default CreateCompanyPage