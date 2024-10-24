import { LoadingButton } from '@/components';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'
import { authService } from '@/services';
import { storeUpdateResume } from '@/store/authSlice';
import { getErrMsg } from '@/utils';
import { PenBox } from 'lucide-react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

function Resume() {
  const user = useSelector(state => state.auth.userData);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const {register, handleSubmit, reset} = useForm();

  const submit = async(data) => {

    if(!loading){
      setLoading(true);
      try {
        const response = await authService.updateResume(data);
        dispatch(storeUpdateResume(response.data));
        setOpen(false);
        reset({  resume: null  });
        toast.success(response.message);
      } catch (error) {
        getErrMsg(error, true)
      }
      finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className='grid w-full max-w-sm items-center gap-1.5 mt-5'>
      <Label className="text-medium font-bold text-slate-700">Resume</Label>

      <div className='flex items-center gap-5'>
        {
          user?.profile?.resume ? 
          
          <>
            <div>
              <a target='blank' href={user.profile.resume} className='text-blue-500 hover:underline cursor-pointer'>
                {
                  user.profile.resumeOriginalName ? user.profile.resumeOriginalName : "resume.pdf"
                }
              </a>
            </div>

            <Button 
            size="sm" 
            variant="ghost" 
            className="rounded-full" 
            onClick={() => setOpen(true)}
            >
              <PenBox size={15} />
            </Button>

          </>
          : <span className='text-slate-700'>
              You have not setup your resume yet. 
              <Button 
              size="sm" 
              variant="ghost" 
              className="text-blue-500 hover:text-blue-500 hover:underline hover:bg-white"  
              onClick={() => setOpen(true)}
              >Add Resume</Button>
            </span>
        }

        <Dialog open={open} onOpenChange={() => setOpen(false)}>
          
          <DialogContent className="sm:max-w[425px]" >
            
            <DialogHeader>
              <DialogTitle> {user?.profile?.resume ? "Update Resume" : "Add Resume" } </DialogTitle>
            </DialogHeader>

            <DialogDescription>
              Upload your updated resume pdf file
            </DialogDescription>

            <form onSubmit={handleSubmit(submit)}>
              <div>

                <Input
                  type="file" 
                  id="resume" 
                  accept="application/pdf"
                  placeholder="Select Your Resume pdf file" 
                  className="boder-2 mb-3 mt-1 col-span-3"
                  {...register('resume')}
                />

                <LoadingButton text="Save" loading={loading} />

              </div>
            </form>

          </DialogContent>
        </Dialog>
        

      </div>
      
    </div>
  )
}

export default Resume