import { JobCard } from '@/components/app/jobs';
import { Button } from '@/components/ui/button';
import { useGetJobs, useSearchJobs } from '@/hooks';
import { addSearchedJobs, storeSearchQuery } from '@/store/jobSlice';
import { Search } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export default function SearchJob() {
  const dispatch = useDispatch();


  const jobs = useSelector(state => state.job.searchedJobs) || []
  const searchQuery = useSelector(state => state.job.searchQuery)
  const [query, setQuery] = React.useState(searchQuery || '');

  const [currentPage, setCurrentPage] =  useState(1);
  const [limit, setLimit] =  useState(10);

  const {loading,  paginateOption } = useSearchJobs(currentPage, limit)


  const searchJobHandler = () => {
    dispatch(storeSearchQuery(query));
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchJobHandler();
    }
  };

  useEffect(() => {
    return () => {
      dispatch(addSearchedJobs([]));
      dispatch(storeSearchQuery(""));
    }
  }, [dispatch])

  return (
    <div className='mt-5'>

      <div className='my-10 flex min-w-[400px] md:w-[70%] xl:w-[60%] h-[50px] shadow-lg border border-slate-200 pl-3 rounded-full items-center gap-4 mx-auto overflow-hidden'>
        <input 
        type="text" 
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        value={query}
        placeholder='search' 
        className='outline-none border-none w-full px-3 text-slate-600' 
        />
        <Button 
        onClick={searchJobHandler}
        className=" bg-orange-700 hover:bg-orange-600 h-[50px] "
        >
          <Search className='h-5 w-5 '/>
        </Button>
      </div>

        {loading ?
        <div className='flex justify-center items-center h-80 mx-auto'>
        <Loader2 className="mr-2 h-8 w-8 text-center animate-spin duration-1000"/>
        </div>
        : 
          jobs.length <= 0 ? <div className='text-center p-4'>No jobs found</div> :
          <div className='flex-1 h-[88vh] overflow-y-auto p-4 pb-10 pt-0'>
            <h1 className='mb-2 font-medium text-slate-700'>Search Result: ({paginateOption?.itemCount || 0})</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3'>
              {
                jobs.map((job) => (
                  <div key={job._id}>
                    <JobCard job={job}/>
                  </div>
                ))
              }
            </div>
          </div>
        }
    </div>
  )
}
