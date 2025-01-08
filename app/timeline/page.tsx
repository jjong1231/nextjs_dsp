"use client"
import React from 'react'
import css from "../../css/timeline.module.css"
import storeData from '../../storeData/storeData'
const page = () => {

  const { userMno, userName, userGrade } = storeData();

  return (

    <div className={css.content}>
      <h1>타임2라인</h1>

      <ul className={css.timeline}>
        {userGrade==80?(
          <li className={css.timeline_item}>
          <div className={css.left}>
            <span className={css.date}>2024년 1월</span>
          </div>
          <div className={css.right}>
            <p>로그인 되었을때만 표시</p>
            <p>{userMno} / {userName} / {userGrade}</p>
          </div>
        </li>
        ):''}
        <li className={css.timeline_item}>
          <div className={css.left}>
            <span className={css.date}>2024년 2월</span>
          </div>
          <div className={css.right}>
            <p>오른쪽 타임라인의 내용 2</p>
            <p>오른쪽 타임라인의 내용 2</p>
            <p>오른쪽 타임라인의 내용 2</p>
            <p>오른쪽 타임라인의 내용 2</p>
            <p>오른쪽 타임라인의 내용 2</p>
          </div>
        </li>
        <li className={css.timeline_item}>
          <div className={css.left}>
            <span className={css.date}>2024년 3월</span>
          </div>
          <div className={css.right}>
            <p>오른쪽 타임라인의 내용 3</p>
          </div>
        </li>
        <li className={css.timeline_item}>
          <div className={css.left}>
            <span className={css.date}>2024년 4월</span>
          </div>
          <div className={css.right}>
            <p>오른쪽 타임라인의 내용 4</p>
          </div>
        </li>
      </ul>

    </div>

  )
}

export default page
