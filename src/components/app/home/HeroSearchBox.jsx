import { Button } from '@/components/ui/button'
import { setKeyword } from '@/store/searchSlice';
import { Search } from 'lucide-react'
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function HeroSearchBox() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [query, setQuery] = React.useState('');

  const searchJobHandler = () => {
    console.log(query);
    dispatch(setKeyword(query));
    navigate('/search-job')
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchJobHandler();
    }
  };

  return (
    <div className='flex min-w-[300px] w-[70%] lg:w-[60%] xl:w-[50%] h-[50px] shadow-lg border border-slate-200 pl-3 rounded-full items-center gap-4 mx-auto mt-5 overflow-hidden'>
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
  )
}
