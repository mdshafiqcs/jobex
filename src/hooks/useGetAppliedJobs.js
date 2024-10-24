import { jobService } from "@/services";
import { addAppliedJobs } from "@/store/jobSlice";
import { getErrMsg } from "@/utils";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";



const useGetAppliedJobs = ({currentPage = 1, limit = 9}) => {
  const dispatch = useDispatch();
  const [paginateOption, setPaginateOption] = useState({});

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await jobService.getAppliedJobs(currentPage, limit);
        dispatch(addAppliedJobs(response.applications))
        setPaginateOption({...response, applications: undefined});
      } catch (error) {
        getErrMsg(error, false);
      }
    }
    fetchJobs();
  }, [currentPage, limit, dispatch])
  return { paginateOption }
}


export default useGetAppliedJobs;