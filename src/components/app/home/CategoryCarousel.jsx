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


function CategoryCarousel() {

  const categories = [
    "Frontend Developer",
    "Backend Developer",
    "Fullstack Developer",
    "Graphics Designer",
    "Data Science",
    "Blockchain",
    "Video Editing",
  ]

  return (
    <Carousel className="w-full max-w-lg mx-auto">
      <CarouselContent className="-ml-1">
        {categories.map((item) => (
          <CarouselItem key={item} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="rounded-full">
                <Button className="w-full rounded-full outline-none bg- white hover:bg-slate-100 text-slate-600 duration-200">{item}</Button>
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