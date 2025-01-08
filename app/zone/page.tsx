"use client"
import React, { useEffect, useState } from 'react'
import ZoneList from '../../components/zoneList';
import Pagenation from '../../components/pagenation';
import Link from 'next/link';

const page = () => {

  const [list, setList] = useState([]);
  const [page, setPage] = useState(1); //현재페이지
  const [lastPage, setLastPage] = useState(1); //마지막페이지
  const [keywords, setKeywords] = useState(""); //검색어
  const listRows = 10; //1페이지 게시물수

  const getZoneList = async (getPage,getKeyword)=>{
    try{
      const res = await fetch('/api/getZoneList',{
        method:"POST",
        cache:"no-store",
        body:JSON.stringify({page:getPage,listRows:listRows,keywords:getKeyword})
      });
      const data = await res.json();
      setPage(getPage);
      setKeywords(getKeyword);
      setList(data.result.list);
      const lastPage = Math.ceil(data.result.total / listRows);
      setLastPage(lastPage);
    }catch(e){
      console.log(e);
    }
  }

  //페이지 이동
  const goPage = (go) => {
    console.log('이동페이지 :',go);
    //뒤로가기시
    sessionStorage.setItem("pageNum", go);
    setPage(go);
    getZoneList(parseInt(go), keywords);

  };


  const searchBtn = ()=>{

  }

  useEffect(()=>{
    const thisPageNum = sessionStorage.getItem("pageNum")
      ? parseInt(sessionStorage.getItem("pageNum"))
      : 1;
    sessionStorage.setItem("pageNum", String(thisPageNum));
    getZoneList(thisPageNum, "");
  },[])

  return (
    <div className='w-full px-10'>
      <div className="flex justify-between items-center m-5">
        {/* <h1 className="text-5xl font-extrabold dark:text-white"></h1> */}
        <div>
          <Link href='zone/addZone' className='p-2 border rounded-lg hover:bg-red-400'>영역추가</Link>
        </div>
        <div>
          <input
            id="keywords"
            type="text"
            name="keywords"
            className="rounded-sm text-right px-1"
            placeholder="ID or Name"
            defaultValue={""}
          />{" "}
          <button
            type="button"
            className="px-3 py-2 border text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={searchBtn}
          >
            검색
          </button>
        </div>
      </div>

      <ZoneList data={list} page={page} lastPage={lastPage}></ZoneList>
      <div className="min-w-96 m-5 text-center">{page}/{lastPage}
        <Pagenation page={page} last={lastPage} goPage={goPage}></Pagenation>
      </div>

    </div>
  )
}

export default page
