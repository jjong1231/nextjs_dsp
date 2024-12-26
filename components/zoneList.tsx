import React, { useState } from 'react'
import Pagenation from './pagenation'
import Link from 'next/link';

interface dataType{
  data: object;
  page: number;
  lastPage: number;
}


const ZoneList = ({data,page,lastPage}:dataType) => {

  // console.log('==> data',data,Object.keys(data).length);

  return (
    <div>
      
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg min-w-96 m-5">
        <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className='px-4 py-3'>no</th>
            <th className='px-4 py-3'>id</th>
            <th className='px-4 py-3'>name</th>
            <th className='px-4 py-3'>regdate</th>
            <th className='px-4 py-3'>edit</th>
          </tr>
          </thead>
          <tbody>
            {Object.keys(data).length>0?(
              Object.entries(data).map(([k,v])=>(
            <tr 
              key={k}
              className="bg-gray-800 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
              <td>{v.mno}</td>
              <td>{v.id}</td>
              <td>{v.name}</td>
              <td>{v.regdate}</td>
              <td><Link href=''>설정</Link></td>
            </tr>
              ))
            ):(
            <tr className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-300">
              <td colSpan={5} scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Loading..</td>
            </tr>
            )}            
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default ZoneList
