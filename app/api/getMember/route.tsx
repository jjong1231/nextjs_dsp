import { NextResponse } from 'next/server'
import React from 'react'
import db from '../../../lib/db'

export const POST = async (req) => {
  const v = await req.json();
  const page = v.page?parseInt(v.page):1;
  const listRows = v.listRows;
  const keywords = v.keywords;
  const q_where = keywords
    ? " where name like '%" + keywords + "%' or id like '%" + keywords + "%'"
    : "";
  const q_limit = ' limit ' + listRows*(page-1) + ', ' + listRows;
  const qry = "select mno, id, name, grade, DATE_FORMAT(regdate, '%Y-%m-%d %h-%i-%s') regdate from MEMBER order by mno desc";
  const rs1 = await db.query(qry + q_where + q_limit);
  const qry2 = "select count(mno) total from MEMBER";
  const rs2 = await db.query(qry2 + q_where);
  const [data1,data2] = await Promise.all([rs1,rs2]);
  const data = {
    list: data1[0],
    total: data2[0][0].total
  }
  return NextResponse.json({success:true,data});
}