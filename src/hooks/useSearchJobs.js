import { jobService } from "@/services";
import { addSearchedJobs } from "@/store/searchSlice";

import { getErrMsg } from "@/utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";



const useSearchJobs = () => {
  const dispatch = useDispatch();
  const [paginateOption, setPaginateOption] = useState({});
  const [loading, setLoading] = useState(false);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const currentPage = useSelector(state => state.search.currentPage);
  const limit = useSelector(state => state.search.limit);
  const keyword = useSelector(state => state.search.keyword);
  const locationId = useSelector(state => state.search.locationId);
  const categoryId = useSelector(state => state.search.categoryId);
  const salary = useSelector(state => state.search.salary);

  useEffect(() => {

    const fetchJobs = async () => {
      setLoading(true);
      try {

        const response = await jobService.searchJobs({currentPage, limit, keyword, locationId, categoryId, minSalary: salary.min, maxSalary:salary.max });
        dispatch(addSearchedJobs(response.jobs))
        setPaginateOption({...response, jobs: undefined});

      } catch (error) {
        getErrMsg(error, false);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();

  }, [dispatch, isLoggedIn, currentPage, limit, keyword, locationId, categoryId, salary])

  return { paginateOption, loading }
}


export default useSearchJobs;