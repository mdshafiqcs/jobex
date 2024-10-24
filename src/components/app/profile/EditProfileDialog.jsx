import { LoadingButton } from '@/components';
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PenBox } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { authService } from '@/services';
import { getErrMsg } from '@/utils';
import { storeUser } from '@/store/authSlice';
import { UserRoleEnum } from '@/constants';

function EditProfileDialog() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const userData = useSelector(state => state.auth.userData);

  const {register, handleSubmit, reset} = useForm({defaultValues: {
    fullname: userData?.fullname || "",
    phone: userData?.phone || "",
    bio: userData?.profile?.bio || "",
    skills: userData?.profile?.skills?.length > 0 ? userData.profile.skills.toString()  : "",
  }});

  const submit = async(data) => {

    if(!loading){
      setLoading(true);
      try {
        const response = await authService.updateProfile(data);
        dispatch(storeUser(response.data.user));
        setOpen(false);
        reset({  profilePhoto: null  });
        toast.success(response.message);
      } catch (error) {
        getErrMsg(error, true);
      }
      finally {
        setLoading(false);
      }
    }
  }

  return (
    <div>

          <Button 
          size="icon" 
          className="rounded-full" 
          variant="ghost"
          onClick={() => setOpen(true)}
          >
            <PenBox/>
          </Button>

      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        
        <DialogContent className="sm:max-w[425px]" >
          
          <DialogHeader>
            <DialogTitle> Update Profile </DialogTitle>
          </DialogHeader>

          <DialogDescription>
            Keep your profile information upto date
          </DialogDescription>

          <form onSubmit={handleSubmit(submit)}>
            <div className='grid  py-4'>

              <div className='grid grid-cols-4 gap-4 items-center '>
                <Label htmlFor="fullname" > Full Name </Label>
                <Input 
                type="text" 
                id="fullname" 
                placeholder="Enter your Full Name" 
                className="boder-2 mb-3 mt-1 col-span-3"
                {...register('fullname', {required: true})}
                />
              </div>

              <div className='grid grid-cols-4 gap-4 items-center'>
                <Label htmlFor="phone" > Phone </Label>
                <Input 
                type="text" 
                id="phone" 
                placeholder="Enter your Phone" 
                className="boder-2 mb-3 mt-1 col-span-3"
                {...register('phone')}
                />
              </div>

              <div className='grid grid-cols-4 gap-4 items-center'>
                <Label htmlFor="bio" > Bio </Label>
                <Input 
                type="text" 
                id="bio" 
                placeholder="Enter your Bio" 
                className="boder-2 mb-3 mt-1 col-span-3"
                
                {...register('bio')}
                />
              </div>
              {
                userData && userData.role === UserRoleEnum.jobseeker 
                ?
                  <div className='grid grid-cols-4 gap-4 items-center'>
                  <Label htmlFor="skills" > Skills </Label>
                  <Input 
                  type="text" 
                  id="skills" 
                  placeholder="Enter your skills separated by comma" 
                  className="boder-2 mb-3 mt-1 col-span-3"
                  
                  {...register('skills')}
                  />
                </div> 
                : null
              }
              

              <div className='grid grid-cols-4 gap-4 items-center'>
                <Label htmlFor="profilePhoto" > Profile Photo </Label>
                <Input 
                type="file" 
                id="profilePhoto" 
                accept="image/png, image/jpg, image/jpeg"
                className="boder-2 mb-3 mt-1 col-span-3"
                {...register('profilePhoto')}
                />
              </div>

              <LoadingButton text="Save" loading={loading} />

            </div>
          </form>

        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EditProfileDialog