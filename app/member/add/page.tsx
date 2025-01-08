'use client'
import React, { useState } from 'react'

const add = () => {

  const [grade, setGrade] = useState('');
  const fnGrade = (e)=>{ setGrade(e.target.value) }

  const fnReg = ()=>{

  }

  return (
    <div className='w-full px-10'>
      <h1>회원등록</h1>
      <div className="border">
        <div className='text-left border-b'>
          <div className="inline-block border-r w-1/4 text-center">아이디</div>
          <div className="inline-block pl-6 py-1"><input type="text" className="pl-2 border bg-gray-500 text-white" /></div>
        </div>
        <div className='text-left border-b'>
          <div className="inline-block border-r w-1/4 text-center">비밀번호</div>
          <div className="inline-block pl-6 py-1">
            <input type="password" className="pl-2 border bg-gray-500 text-white" />
            <input type="password" className="ml-4 pl-2 border bg-gray-500 text-white" /> 비밀번호 체크
          </div>
        </div>
        <div className='text-left border-b'>
          <div className="inline-block border-r w-1/4 text-center">이름</div>
          <div className="inline-block pl-6 py-1"><input type="text" className="pl-2 border bg-gray-500 text-white" /></div>
        </div>
        <div className='text-left'>
          <div className="inline-block border-r w-1/4 text-center">회원등급</div>
          <div className="inline-block pl-6 py-1">
            <select className="px-6 border bg-gray-500" onChange={fnGrade} value={grade}>
              <option value="" disabled>회원등급 선택</option>
              <option value="10">매체</option>
              <option value="20">대행사</option>
              <option value="90">관리자</option>
            </select>{grade}
          </div>
        </div>
      </div>
      <div className='text-center'>
        <button className="border p-1 my-2" onClick={fnReg}>등록</button>
      </div>
    </div>
  )
}

export default add
