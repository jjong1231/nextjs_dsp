"use client"
import React from 'react'
import storeData from '../storeData/storeData'

const page = () => {
  const { userMno, userName, userGrade } = storeData();
  return (
    <div>
      Home
      <p>{userMno} / {userName}</p>
    </div>
  )
}

export default page
