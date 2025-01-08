'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

interface dataType{
  tbName: string;
}

const TableList = ({tbName}:dataType) => {

  const apiData = {
    'member': {api:'getMember', header:['회원번호','아이디','이름','등급','등록일'], col:['mno','id','name','grade','regdate'], add:true},
    'media': {api:'getMedia',header:['매체번호','매체명','매체코드']},
    'zone': {api:'getZoneList',header:['영역번호','영역명','영역코드']}
  }
  // console.log('==> apiData',apiData[tbName]);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [list, setList] = useState([]);
  const listRows = 10;
  
  const getData = async (getPage)=>{
    try{
      const res = await fetch('/api/'+apiData[tbName].api,{
        method:'POST',
        cache:'no-store',
        body:JSON.stringify({page:getPage,listRows:listRows})
      });
      const rs = await res.json();

      // return;
      console.log(rs.data.list);
      
      setPage(getPage);
      setTotal(rs.data.total);
      setList(rs.data.list);
      setLastPage(Math.ceil(rs.data.total/listRows));
    }catch(e){
      console.log('==>',e);
    }
  }

  const width = 'w-['+100/parseInt(apiData[tbName].header.length)+'%]';
  

  useEffect(()=>{
    getData(1);
  },[])
  
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg min-w-96 m-5">
        {
          apiData[tbName].add?(
          <div className='py-3 text-right'>
            <Link href={`/${tbName}/add`} className='border py-1 px-2 rounded hover:bg-white hover:text-gray-600'>등록</Link>
          </div>
          ):''
        }
        <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              { 
                apiData[tbName].header.map((v,i)=>(
                  <th key={i} className={`py-2 ${width}`}>{v}</th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {total==0?(
              <tr className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td colSpan={apiData[tbName].header.length} className='text-center p-2'>데이터가 없습니다.</td>
              </tr>            
            ):
              list?(
                Object.entries(list).map(([k,v])=>(
                <tr key={k} className="bg-gray-800 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  {apiData[tbName].col.map(key=>(
                    <td key={k+key} className='p-2'>{v[key]}</td>
                  ))}
                </tr>
                )
              )):''
            }
          </tbody>
        </table>
      </div>


      
    </div>
  )
}

export default TableList
