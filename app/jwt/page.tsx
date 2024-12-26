'use client'
import React, { useEffect, useState } from 'react'
import storeData from '../../storeData/storeData';

const secret_key = process.env.NEXT_PUBLIC_jwt_key;

export default function page(){

  const {userMno, userName, userGrade} = storeData();

  useEffect(()=>{

  },[]);

  return (
    <div>
      {userMno?(
        <div>
          userMno : {userMno} , userName : {userName} , userGrade : {userGrade}
        </div>
      ):''}
      
    </div>
    
  );
}