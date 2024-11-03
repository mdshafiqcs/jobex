import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function BackButton({className}) {

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  return (
    <ArrowLeft onClick={goBack} className={cn('absolute top-5 left-5 cursor-pointer text-slate-600', className)} />
  )
}
