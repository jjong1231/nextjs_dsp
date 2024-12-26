"use client"

import React, { useState } from 'react';
import style from '../css/nav.module.css';
import Link from 'next/link';

const Navbar = () => {

  const [activeMenu, setActiveMenu ] = useState(null);
  const toggleMenu = (index)=>{
    if(activeMenu==index){
      setActiveMenu(null);
    }else{
      setActiveMenu(index);
    }
  }

  return (
    <div className={style.header}>
      <nav className={style.navbar}>
        <div className=""><Link href="/">Home</Link></div>
        <ul className={style.menu}>
          <li 
            className={style.menuItem}
            onMouseEnter={()=>setActiveMenu(0)}
            onMouseLeave={()=>setActiveMenu(null)}
            >
            <a href="#">테스트항목</a>
            <ul className={`${style.submenu} ${activeMenu===0 ? style.active : ""}`}>
              <li><Link href="/login">로그인</Link></li>
              <li><Link href="/jwt">JsonWebToken</Link></li>
              <li><Link href="/join">회원등록</Link></li>
              <li><Link href="/insert">데이터추가</Link></li>
              <li><Link href="/modal">모달창</Link></li>
              <li><Link href="/timeline">타임라인</Link></li>
              <li><Link href="/accordion">아코디언</Link></li>
            </ul>
          </li>
          <li 
            className={style.menuItem}
            onMouseEnter={()=>setActiveMenu(1)}
            onMouseLeave={()=>setActiveMenu(null)}
          >
            <a href="#">영역설정</a>
            <ul className={`${style.submenu} ${ activeMenu===1 ? style.active : ""}`}>
              <li><Link href="/zoneList">영역리스트</Link></li>
            </ul>
          </li>

          <li className={style.menuItem}>
            <a href="#">메뉴 3</a>
          </li>

        </ul>

      </nav>
      
    </div>
  )
}

export default Navbar
