import { companyService } from "@/services";
import { addCompanies } from "@/store/companySlice";

import { getErrMsg } from "@/utils";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


const useGetCompanies = (currentPage = 1, limit = 10, keyword = "") => {

  const dispatch = useDispatch();
  const [paginateOption, setPaginateOption] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const fetchJobs = async () => {
      setLoading(true);
      try {

        const response = await companyService.getAllCompanies(currentPage, limit, keyword);
        dispatch(addCompanies(response.companies))
        setPaginateOption({...response, companies: undefined});

      

      } catch (error) {
        getErrMsg(error, false);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();

  }, [currentPage, limit, dispatch, keyword])

  return { paginateOption, loading }
}


export default useGetCompanies;