
import React from 'react'
import { useSelector } from 'react-redux'
import { ProfileCard, AllAppliedJobs } from '@/components/app/profile';
import { UserRoleEnum } from '@/constants';

function Profile() {
  const user = useSelector(state => state.auth.userData);

  return (
    <>
      <ProfileCard/>
      {
        user.role && user.role === UserRoleEnum.jobseeker && <AllAppliedJobs/>
      }
      
    </>
  )
}

export default Profile