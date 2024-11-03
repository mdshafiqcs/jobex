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
    <ArrowLeft onClick={goBack} className={cn('inline-block cursor-pointer text-slate-600', className)} />
  )
}
