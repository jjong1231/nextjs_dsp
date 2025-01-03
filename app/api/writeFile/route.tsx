import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

export const POST = async (req) => {
  const v = await req.json();
  const fPath = v.path;
  console.log(fPath);

  try{

    fs.writeFileSync(fPath, JSON.stringify(v.data));

  }catch(e){
    console.log('========> error',e);
  }

  return NextResponse.json({aa:'1234'});
}