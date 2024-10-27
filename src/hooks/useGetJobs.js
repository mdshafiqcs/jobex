import { jobService } from "@/services";
import { addJobs } from "@/store/jobSlice";

import { getErrMsg } from "@/utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";



const useGetJobs = ({currentPage = 1, limit = 9}) => {
  const dispatch = useDispatch();
  const [paginateOption, setPaginateOption] = useState({});
  const [loading, setLoading] = useState(false);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  useEffect(() => {

    const fetchJobs = async () => {
      setLoading(true);
      try {

        const response = await jobService.getAllJobs({currentPage, limit});
        dispatch(addJobs(response.jobs))
        setPaginateOption({...response, jobs: undefined});

      } catch (error) {
        getErrMsg(error, false);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();

  }, [currentPage, limit, dispatch, isLoggedIn])

  return { paginateOption, loading }
}


export default useGetJobs;