import { jobService } from "@/services";
import { addSearchedJobs } from "@/store/jobSlice";

import { getErrMsg } from "@/utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";



const useSearchJobs = ({currentPage = 1, limit = 9}) => {
  const dispatch = useDispatch();
  const [paginateOption, setPaginateOption] = useState({});
  const [loading, setLoading] = useState(false);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const keyword = useSelector(state => state.job.searchQuery);

  useEffect(() => {

    const fetchJobs = async () => {
      setLoading(true);
      try {

        const response = await jobService.getAllJobs({currentPage, limit, keyword});
        dispatch(addSearchedJobs(response.jobs))
        setPaginateOption({...response, jobs: undefined});

      } catch (error) {
        getErrMsg(error, false);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();

  }, [currentPage, limit, dispatch, isLoggedIn, keyword])

  return { paginateOption, loading }
}


export default useSearchJobs;