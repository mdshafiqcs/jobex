import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Contact2, Mail, PenBox } from 'lucide-react';
import React from 'react'
import { useSelector } from 'react-redux';
import { EditProfileDialog, Resume } from './index';
import { UserRoleEnum } from '@/constants';

function ProfileCard() {
  const user = useSelector(state => state.auth.userData);
  const src = user?.profile?.profilePhoto || "https://github.com/shadcn.png";

  return (
    <div className='border border-gray-200 rounded-xl my-5 p-5'>

        <div className='flex flex-col sm:flex-row items-center gap-4'>
          <Avatar className='h-24 w-24 border-2 boder-teal-600'>
            <AvatarImage src={src} className='h-full w-full object-cover'/>
          </Avatar>
          <div className='flex w-full flex-col  justify-between items-start'>
            <div className='flex items-center w-full'>
              <h1 className='font-medium text-lg sm:text-xl text-slate-700'>{user?.fullname || "User"}</h1>
              <EditProfileDialog/>
            </div>
            <p  className='text-slate-600'>{user?.profile?.bio || "You bio will be here"}</p>
          </div>
        </div>

        <div className='my-5'>
          <div className='flex items-center gap-3  mb-2'>
            <Mail className='text-slate-600'/>
            <span className='text-slate-600'>{user?.email || "N/A"}</span>
          </div>
          <div className='flex items-center gap-3 mb-2'>
            <Contact2 className='text-slate-600' />
            <span className='text-slate-600'>{user?.phone || "N/A"}</span>
          </div>
        </div>
        
        {
          user && user.role === UserRoleEnum.jobseeker && 
          <>
            <div  className='mt-5'>
              <Label className="text-medium font-bold text-slate-700">Skills</Label>
              <div className='flex flex-wrap gap-2 mt-1'>
                {
                  user?.profile?.skills?.length > 0 ?
                  user?.profile?.skills?.map((item) => (
                    <div key={item}><Badge className="bg-teal-600 hover:bg-teal-700">{item}</Badge></div>
                  )) : <span className='text-slate-700'>You have not added any skill yet.</span>
                }
              </div>
            </div>
            <Resume /> 
          </> 
          
        }
        
      </div>
  )
}

export default ProfileCard