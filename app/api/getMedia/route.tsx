import { NextResponse } from 'next/server'
import db from '../../../lib/db'
import React from 'react'

export const POST = async (req) => {

  const v = await req.json();
  console.log('v ==> ',v);
  const page = v.page?parseInt(v.page):1;
  const listRows = v.listRows;
  const q_where = '';
  const q_orderby = ' order by mdno desc';
  const q_limit = " limit "+listRows*(page-1)+", "+listRows;
  
  const rs1 = db.query("select mdno,md_name from MEDIA" + q_where + q_orderby + q_limit);
  const rs2 = db.query("select count(mdno) cnt from MEDIA " + q_where);
  const [data1,data2]= await Promise.all([rs1,rs2]);
  console.log('data1',data1);
  console.log('data2',data2);
  const data = {
    list: data1[0],
    total: data2[0][0].cnt
  }

  return NextResponse.json({data});
}