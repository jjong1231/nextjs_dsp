"use client"
import { useEffect } from 'react';
import storeData from '../../storeData/storeData';
import { useRouter } from 'next/navigation';

export default function login({
  children,
}: {
  children: React.ReactNode
}) {

  const { userMno, userName, userGrade } = storeData();
  const router = useRouter();

  useEffect(()=>{
    if(userMno>0){
      router.push('/');
    }    
  },[userMno]);

  return (
    <>
      {children}
    </>
  )
}