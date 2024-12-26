"use client"
import React, { useEffect, useState } from 'react'
import storeData from '../../storeData/storeData'
import VerifyToken from '../../lib/verifyToken';
import { useRouter } from 'next/navigation';

const page = () => {

  const router = useRouter();
  
  const { userMno, userName, userGrade, setUserMno, setUserName, setUserGrade } = storeData();
  const [id,setId] = useState('');
  const [pw,setPw] = useState('');
  const changeId = (e)=>setId(e.target.value);
  const changePw = (e)=>setPw(e.target.value);
  const loginAuth = async ()=>{
    if(id=='' || pw==''){
      alert('아이디, 패스워드를 입력하세요.')
      return;
    }
    const res = await fetch('/api/auth',{
      method:"POST",
      cache:"no-store",
      body:JSON.stringify({id:id,pw:pw})
    });
    const rs = await res.json();
    if(rs.success){
      //로컬스토리지에 암호화저장 
      localStorage.setItem('authToken',rs.result);
      const v = VerifyToken(rs.result);
      // console.log('암호화 풀어서 스토어에 저장 ',v);
      // setAuthInfo(JSON.stringify(v)); //글로벌 변수에 저장 
      setUserMno(v.mno);
      setUserName(v.name);
      setUserGrade(v.grade);
    }else{
      localStorage.removeItem('authToken');
      alert('로그인실패!');
    }
  }

  const pushEnter = (e)=>{
    if(e.key==='Enter'){
      loginAuth();
    }
  }
  
  return (
    <>
      {userMno==0?(
        <div>
          <div className='p-2'>
          <label htmlFor="userId" className="block bm-2 text-sm font-medium text-gray-900 dark:text-white">User Id</label>
          <input type="text" value={id} onChange={changeId} onKeyDown={pushEnter} className="px-1 border bg-gray-50 border-gray-300 text-gray-900 dark:text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-1/4" placeholder='ID 입력' />
        </div>
        <div className='p-2'>
          <label htmlFor="userPw" className="block bm-2 text-sm font-medium text-gray-900 dark:text-white">User Pw</label>
          <input type="text" value={pw} onChange={changePw} onKeyDown={pushEnter} className="px-1 border bg-gray-50 border-gray-300 text-gray-900 dark:text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-1/4" placeholder='비밀번호 입력' />
        </div>
        <div className="p-2">
          <div> 로그인데이터 : {userMno} / {userName} / {userGrade} </div>
          <button className='p-2 bg-red-400 rounded-lg' onClick={loginAuth}>로그인</button>
        </div>
      </div>
      ):''}
      </>
  )
}

export default page
