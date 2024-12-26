import db from "../../../lib/db";
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';


const secretKey = process.env.NEXT_PUBLIC_jwt_key;

export const POST = async (req) => {
  const v = await req.json(),
        id = v.id,
        pw = v.pw;
  let is_success = false, result = false;

  try{
    const [rs] = await db.query('select mno,name,grade,id from mem where id=? and pw=?', [id,pw]);    
    if(Object.keys(rs).length==1){
      is_success=true;
      //jwt인코딩 
      const authData = jwt.sign(rs[0],secretKey,{expiresIn:'1h'});
      result = authData;
    }
  }catch(e){
    console.log(e);
  }

  return NextResponse.json({success:is_success,result});
}
