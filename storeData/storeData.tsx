import { create } from "zustand";

type storeDataType = {
  userMno: number;
  userName:string;
  userGrade:number;  
  setUserMno: (v:number) => void;
  setUserName: (v:string) => void;
  setUserGrade: (v:number) => void;
}

const storeData = create<storeDataType>(set=>({
  userMno: 0,
  userName: '',
  userGrade: 0,
  setUserMno: (v)=>set({userMno:v}),
  setUserName: (v)=>set({userName:v}),
  setUserGrade: (v)=>set({userGrade:v}),
}));

export default storeData;