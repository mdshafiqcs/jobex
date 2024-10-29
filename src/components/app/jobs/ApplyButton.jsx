import { Button } from '@/components/ui/button';
import { routes } from '@/constants';
import { cn } from '@/lib/utils';
import { jobService } from '@/services';
import { applyJob } from '@/store/jobSlice';
import { getErrMsg } from '@/utils';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function ApplyButton({job, className}) {
  const [loading, setLoading] = useState(false); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector(state => state.auth.userData);
  const isApplied = userData ? job?.applications?.find(j => j.applicant === userData._id) : false;

  const apply = async () => {

    if(!userData) {
      toast.warning("Login to apply for jobs");
      return navigate(routes.login);
    }

    if(!isApplied && !loading && job && userData){
      setLoading(true);
      try {
        
        const response = await jobService.applyJob(job._id);
      if(response?.success){
        const data = {
          _id: response.data?.application?._id,
          jobId: response.data?.application?.job,
          applicant: response.data?.application?.applicant,
        }
        dispatch(applyJob(data));
        toast.success(response?.message)
      } else{
        toast.error("Something went wrong");
      }

      } catch (error) {
        getErrMsg(error, true);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <Button 
    size="sm" 
    className={cn("bg-orange-600 hover:bg-cyan-700" , className)} 
    disabled={isApplied || loading} 
    onClick={apply}
    >
      {isApplied? "Already Applied" : loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> please wait</> : "Apply Now"}
    </Button>
  )
}

export default ApplyButton