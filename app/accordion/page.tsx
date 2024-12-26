"use client"
import React, { useState } from 'react'

const page = () => {

  // 열려 있는 아코디언의 인덱스를 관리
  const [openIndex, setOpenIndex] = useState(null);

  // 아코디언 데이터 배열
  const accordionItems = [
    { title: "첫 번째 아코디언", content: "첫 번째 내용입니다." },
    { title: "두 번째 아코디언", content: "두 번째 내용입니다." },
    { title: "세 번째 아코디언", content: "세 번째 내용입니다." },
  ];

  // 아코디언 상태 토글 함수
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index); // 같은 항목 클릭 시 닫기
  };

  return (
    <div className='min-w-full'>
      accordion

      <div className="w-full max-w-md mx-auto mt-10">
      {accordionItems.map((item, index) => (
        <div
          key={index}
          className="mb-2 border border-gray-300 rounded-md overflow-hidden"
        >
          {/* 아코디언 헤더 */}
          <button
            className="w-full text-left px-4 py-3 bg-gray-200 border-b border-gray-300 flex justify-between items-center"
            onClick={() => toggleAccordion(index)}
          >
            <span className="font-medium text-lg">{item.title}</span>
            {/* 아이콘 회전 */}
            <svg
              className={`w-5 h-5 transform transition-transform ${
                openIndex === index ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* 아코디언 내용 */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? "max-h-40 p-4" : "max-h-0 p-0"
            }`}
          >
            <p className="text-gray-700">{item.content}</p>
          </div>
        </div>
      ))}
    </div>


      
    </div>
  )
}

export default page
