'use client'
import React, { useState } from 'react'
import css from '../../css/slideModal.module.css'

const page = () => {

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = ()=>{
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <button onClick={togglePopup}>
        {isOpen ? 'Close Popup' : 'Open Popup'}
      </button>
      <div className={`${css.popup} ${isOpen ? css.open : ''}`}>
        <div className={`text-black css.content`}>
          <div className="bg-gray-500 p-2 flex">
            <div className='pr-4'>
              <button className={`text-black css.closeButton`} onClick={togglePopup}>
                X
              </button>
            </div>
            <div className=''> 팝업레이어 제목 </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
