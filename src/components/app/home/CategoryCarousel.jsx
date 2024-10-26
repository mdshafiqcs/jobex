import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { useDispatch } from 'react-redux'
import { storeSearchQuery } from '@/store/jobSlice'
import { useNavigate } from 'react-router-dom'


function CategoryCarousel() {

  const categories = [
    "Frontend Developer",
    "Backend Developer",
    "Fullstack Web Developer",
    "Graphics Designer",
    "Blockchain",
    "Video Editing",
  ]

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (category) => {
    dispatch(storeSearchQuery(category));
    navigate('/search-job');
  }

  return (
    <Carousel className="w-full max-w-[240px] sm:max-w-[300px] md:max-w-xl mx-auto">
      <CarouselContent className="-ml-1">
        {categories.map((item) => (
          <CarouselItem key={item} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="rounded-full">
                <Button onClick={() => handleClick(item)} className="w-full rounded-full outline-none bg- white hover:bg-slate-100 text-slate-600 duration-200">{item}</Button>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default CategoryCarousel