import React from 'react'
import { RecruiterHomeComponent, UserHomeComponent} from "../components/index.js";
import { useSelector } from 'react-redux'
import { UserRoleEnum } from '../constants.js';

function Home() {
  const user = useSelector(state => state.auth.userData);

  if(user && user.role === UserRoleEnum.recruiter){
    return <RecruiterHomeComponent/>
  } else {
    return <UserHomeComponent/>
  }

}

export default Home