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

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('website', data.website);
    formData.append('location', data.location);
    formData.append('logo', data.logo[0]);

    registerCompany(formData);
  }

  return (
    <div className='flex justify-center mt-10'>
      <div className='w-full max-w-2xl p-5 border rounded-xl shadow-md'>
        <h2 className='text-center text-xl text-orange-600 font-bold'>Add New Company</h2>
        <p className='text-center'>You can not change company name later</p>
        <form className='mt-5' onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data' >

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
            {...register('website')}
            />
          </div>

          <div>
            <Label>Location</Label>
            <Input 
            type="text" 
            id="location" 
            placeholder="company location" 
            className="boder-2 mb-3 mt-1"
            {...register('location')}
            />
          </div>

          <div>
            <Label>Logo</Label>
            <Input 
            type="file" 
            id="logo" 
            accept="image/png, image/jpg, image/jpeg"
            className="boder-2 mb-3 mt-1"
            {...register('logo')}
            />

          </div>

          <LoadingButton text="Save" loading={isLoading} />

        </form>
      </div>
    </div>
  )
}

export default CreateCompanyPage