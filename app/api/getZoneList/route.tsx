import { NextResponse } from 'next/server'
import db from "../../../lib/db"

export const POST = async (req) => {

  const is_success = true;
  const v = await req.json();
  const page = v.page ? parseInt(v.page) : 1;
  const keywords = v.keywords ? v.keywords : false;
  // const listRows = parseInt(process.env.listRows);
  const listRows = v.listRows;
  const qry_limit = " limit " + listRows * (page - 1) + ", " + listRows;
  const qry_where = keywords
    ? " where name like '%" + keywords + "%' or id like '%" + keywords + "%'"
    : "";
  const qry_orderby = " order by mno desc";
  const rs1 = db.query(
    "select mno, id, name, DATE_FORMAT(regdate, '%Y-%m-%d %h:%i:%s') regdate from MEMBER" +
      qry_where +
      qry_orderby +
      qry_limit
  );
  const rs2 = db.query("select count(mno) cnt from MEMBER" + qry_where);
  const [data1, data2] = await Promise.all([rs1, rs2]);
  const result = {
    list: data1[0],
    total: data2[0][0].cnt,
  };
  
  return NextResponse.json({success:is_success,result});
}