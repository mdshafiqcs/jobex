import { jobService } from "@/services";
import { getErrMsg } from "@/utils";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const useSingleJob = (jobId) => {

  const [job, setJob] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const exists =  useSelector(state  => {
    return state.job.allJob.find(j => j._id === jobId);
  });  

  useEffect(() => {
    const fetchJob = async () => {
      if(exists){
        setJob(exists);
        setLoading(false);
      } else {
        try {
          const response = await jobService.getJobById(jobId);
          if(response.job){
            setJob(response.job);
          }
  
        } catch (error) {
          setError(getErrMsg(error, false));
        } finally {
          setLoading(false);
        }
      }
    }

    fetchJob();
  }, [exists, jobId]);

  return { job, loading, error };

}

export default useSingleJob;