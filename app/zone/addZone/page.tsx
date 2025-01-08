'use client'
import React, { useEffect, useState } from 'react'
import "../../../css/zoneBox.css"
import "react-color-palette/dist/css/rcp.css"
import 'jquery-ui/themes/base/all.css'
import AlertColor from '../../../components/alertColor'

import { HiOutlineDesktopComputer } from "react-icons/hi";
import { TfiLayoutLineSolid, TfiLineDotted } from "react-icons/tfi";
import { CiMobile3, CiImageOn } from "react-icons/ci";
import { LuArrowLeftToLine, LuArrowRightToLine, LuArrowUpToLine, LuArrowDownToLine } from "react-icons/lu";
import { GoArrowBoth } from "react-icons/go";
import { BsExclamationCircle, BsArrowsCollapseVertical, BsArrowsCollapse,  } from "react-icons/bs"; //느낌표, 좌우,상하


const page = () => {

  const [alertView, setAlertView] = useState(false);
  const [alertColor, setAlertColor] = useState("yellow");
  const [alertMsg, setAlertMsg] = useState("경고!!");
  //알림창에서 닫기버튼 실행
  const alertOpen = (c,m) => { setAlertColor(c); setAlertMsg(m); setAlertView(true); };
  const alertClose = () => { setAlertView(false); };

  const [name,setName] = useState('');        //영역명
  const [bnType,setBnType] = useState(2);     //배너타입 
  const [wid,setWid] = useState(320);         //가로사이즈 
  const [hei,setHei] = useState(260);         //세로사이즈 
  const [slotW,setSlotW] = useState(1);       //슬롯가로갯수
  const [slotH,setSlotH] = useState(1);       //슬롯세로갯수
  const [zoneAcc,setZoneAcc] = useState(1);   //운영구좌수
  const [plf,setPlf] = useState('M');         //플랫폼 P,M
  const [stepActive,setStepActive] = useState(1);   //클릭한 Step 표시설정 

  //박스그림자 
  const [boxShadow,setBoxShadow] = useState('N');   //박스그림자 없음:N,:사용 
  const fnBoxShadow = (YN)=>{ setBoxShadow(YN); }

  //박스테두리 
  const [boxBorder,setBoxBorder] = useState('N');         //테두리 없음:N,실선:S,점선:D
  const [boxBorderLine,setBoxBorderLine] = useState(false); //테두리 옵션 
  const [boxBorderPx,setBoxBorderPx] = useState(1);       //테두리 두께 
  const [boxBorderColor,setBoxBorderColor] = useState('#fff'); //테두리 색상
  const fnOutLine = (type)=>{ 
    setBoxBorderLine((type=='N'?false:true));
    setBoxBorder(type);
    fn_slotSize();
  }
  const fnOutLinePx = (e)=>{ setBoxBorderPx(e.target.value); fn_slotSize(); }
  const fnOutLineColor = (e)=>{ setBoxBorderColor(e.target.value); }
  //배경색 
  const [bgColorYN,setBgColorYN] = useState('N'); //배경 색상
  const [bgColor,setBgColor] = useState('#fff'); //배경 색상
  const fnBgColorYN = (YN)=>{ setBgColorYN(YN); }
  const fnBgColor = (e)=>{ setBgColor(e.target.value); }
  //슬롯간격
  const [slotGap,setSlotGap] = useState(0);
  const fnSlotGap = (e)=>{ setSlotGap(parseInt(e.target.value)); fn_slotSize(); }
  
  const fnPlf = (plf)=>{ setPlf(plf); }

  const [pt,setPt] = useState(0);   //패딩상단
  const [pr,setPr] = useState(0);   //패딩우측
  const [pb,setPb] = useState(0);   //패딩하단
  const [pl,setPl] = useState(0);   //패딩좌측
  const fnPt = (e)=>{ setPt(parseInt(e.target.value)); fn_slotSize(); }
  const fnPr = (e)=>{ setPr(parseInt(e.target.value)); fn_slotSize(); }
  const fnPb = (e)=>{ setPb(parseInt(e.target.value)); fn_slotSize(); }
  const fnPl = (e)=>{ setPl(parseInt(e.target.value)); fn_slotSize(); }

  const fnWidth = (e)=>{ setWid(parseInt(e.target.value)); fn_slotSize(); }
  const fnHeight = (e)=>{ setHei(parseInt(e.target.value)); fn_slotSize(); }
  const fnSlotW = (e)=>{ setSlotW(parseInt(e.target.value)); fn_slotSize(); }
  const fnSlotH = (e)=>{ setSlotH(parseInt(e.target.value)); fn_slotSize(); }
  const fnZoneAcc = (e)=>{ setZoneAcc(parseInt(e.target.value)); }

  const openStep = (no)=>{ setStepActive(no); }   //step이동
  const fnBnType = (no)=>{ setBnType(no); }       //배터타입 선택 

  const [activeTab, setActiveTab] = useState("tab1"); //step2 탭버튼 1:box,2:slot

  //슬롯갯수 실시간 슬롯사이즈 계산 
  const [slotSize,setSlotSize] = useState('');      //슬롯갯수 적용한 1슬롯 실사이즈 
  const fn_slotSize = ()=>{
    //실사이즈 가로 = 가로-(테두리두께+박스패딩 좌,우+슬롯간격+슬롯두께)
    const w = String((wid - ( (boxBorder=='Y'?(boxBorderPx*2):0) + (pr+pl) + (slotGap*slotW) ))/slotW).split('.');
    const h = String((hei - ( (boxBorder=='Y'?(boxBorderPx*2):0) + (pt+pb) + (slotGap*slotH) ))/slotH).split('.');
    setSlotSize(w[0]+"x"+h[0]);
  }
  
  const [slotBorder,setSlotBorder] = useState('N'); //슬롯보더
  const [slotBorderPx,setSlotBorderPx] = useState(1); //슬롯보더 두께 
  const [slotBorderColor,setSlotBorderColor] = useState('#fff'); //슬롯보더 색상 
  const fnSlotBorder = (v)=>{ setSlotBorder(v); }
  const fnSlotBorderPx = (e)=>{ setSlotBorderPx(e.target.value); }
  const fnSlotBorderColor = (e)=>{ setSlotBorderColor(e.target.value); }
  
  // 썸네일 설정
  const [imgPostion,setImgPostion] = useState('T'); //썸네일 위치 
  const fnImgPostion = (v)=>{ setImgPostion(v); }
  
  const [imgTxtGap,setImgTxtGap] = useState(0); //썸네일 이미지,텍스트 간격 
  const fnImgTxtGap = (e)=>{ setImgTxtGap(e.target.value); }

  //폰트굵기 
  const [fontWeight,setFontWeight] = useState(false); //false:보통,true:굵게
  const isFontWeight = ()=>{
    setFontWeight(!fontWeight);
  }

  //폰트컬러 
  const [fontColor,setFontColor] = useState('#fff'); //폰트컬러 
  const fnFontColor = (e)=>{ setFontColor(e.target.value) }

  //폰트추가 
  const [fontSize,setFontSize] = useState(16);
  const [fontList,setfontList] = useState(['sans-serif']);
  const [selFont,setSelFont] = useState('');

  const fnSelFont = (e)=>{
    const val = e.target.value; //선택폰트 
    console.log('셀렉터 선택값 :',val);

    let overlap = false;  //중복체크 
    let arr = [];
    if(val=='') return;   //미선택시 중지 

    fontList.forEach((v,i) => {
      console.log(v,i);
      if(v=='sans-serif'){
        return true;
      }else if(v==val){
        overlap = true;
        console.log('동일폰트존재');
      }else{
        arr.push(v);
      }
    });
    arr.push(val);
    arr.push('sans-serif');
    console.log('폰트체크 끝!', arr);
    setfontList(arr);
    setSelFont('');//셀렉트 초기화 
    addFontBtn(arr);
  }

  //폰트버튼 리스트 정렬 
  const addFontBtn = (arr)=>{
    //기존 버튼박스 삭제
    const btnList = document.getElementById("fontListBtn");
    const btn = btnList.querySelectorAll("button");
    if(btn) btn.forEach(b => { b.remove() }); //기존 버튼 삭제 
    //폰트리스트 버튼추가 
    let tmpBtn = document.createElement("button");
    arr.forEach((v,i)=>{
      btnList.innerHTML += "<button class='bg-white border border-gray-300 px-1 mx-1'>"+v+(v!="sans-serif"?"<span class='text-red-500 ml-1'>x</span>":"")+"</button>";
    });
    //버튼 이벤트 추가 
    let addEventBtn = btnList.querySelectorAll("button");
    addEventBtn.forEach(v=>{
      const x = v.querySelector('span');
      if(x) x.addEventListener('click',(b)=>{
        v.remove();
        //삭제후 버튼 리스트 업데이트 
        let arrNew = [];
        addEventBtn = btnList.querySelectorAll("button");
        addEventBtn.forEach(v=>{
          //x버튼 존재시 x 텍스트 삭제 
          arrNew.push(v.querySelector("span")?v.textContent.slice(0,-1):v.textContent);
        });
        setfontList(arrNew);
      });
    });
  }
  
  const fnAddFont = (e)=>{ alert(e.target.value); }
  const fnFontSize = (e)=>{ setFontSize(e.target.value); }

  const [textAlignX,setTextAlignX] = useState('L'); //텍스트 가로정렬 
  const [textAlignY,setTextAlignY] = useState('T'); //텍스트 세로정렬 
  const fnTextAlignX = (v)=>{ setTextAlignX(v) }
  const fnTextAlignY = (v)=>{ setTextAlignY(v) }
  //블릿설정
  const [bulletImg,setBulletImg] = useState('off'); //블릿 이미지 
  const [bulletTxt,setBulletTxt] = useState('off'); //블릿 텍스트 
  const [bulletTxtInput,setBulletTxtInput] = useState(''); //블릿 텍스트 입력 
  const [bulletTxtWeight,setBulletTxtWeight] = useState(false); //블릿 텍스트 굵기 
  const [bulletTxtColor,setBulletTxtColor] = useState('#fff'); //블릿 텍스트 색상 
  const [bulletTxtPx,setBulletTxtPx] = useState('#fff'); //블릿 텍스트 우측 띄움   
  const fnBulletImg = ()=>{ setBulletImg(bulletImg=='on'?'off':'on'); }
  const fnBulletTxt = ()=>{ setBulletTxt(bulletTxt=='on'?'off':'on'); }
  const fnBulletTxtInput = (e)=>{ setBulletTxtInput(e.target.value); }
  const fnBulletTxtWeight = ()=>{ setBulletTxtWeight(bulletTxtWeight?false:true); }
  const fnBulletTxtColor = (e)=>{ setBulletTxtColor(e.target.value); }
  const fnBulletTxtPx = (e)=>{ setBulletTxtPx(e.target.value); }
  //플로팅설정
  const [flotYN, setFlotYN] = useState('Y'); //플로팅 사용여부 
  const fnFlotYN = (YN)=>{ setFlotYN(YN=='Y'?'Y':'N'); }
  //스크롤효과
  const [selfixed,setSelfixed] = useState('scrollFix');
  const fnSelfixed = (e)=>{ setSelfixed(e.target.value); }
  //노출효과
  const [selEffect,setSelEffect] = useState('none');
  const fnSelEffect = (e)=>{ setSelEffect(e.target.value); }
  //첫노출조건
  const [selShowMode,setSelShowMode] = useState('now');
  const fnSelShowMode = (e)=>{ setSelShowMode(e.target.value); }  
  const [pxSelector,setPxSelector] = useState('px');
  const fnPxSelector = (e)=>{ setPxSelector(e.target.value); }
  const [scrollSelector,setScrollSelector] = useState('');
  const fnScrollSelector = (e)=>{ setScrollSelector(e.target.value); }
  const [scrollSelectorPx,setScrollSelectorPx] = useState(0);
  const fnScrollSelectorPx = (e)=>{ setScrollSelectorPx(e.target.value); }
  const [scrollPxPx,setScrollPxPx] = useState(0);
  const fnSetScrollPxPx = (e)=>{ setScrollPxPx(e.target.value); }
  const [showTime,setShowTime] = useState(0);
  const fnShowTime = (e)=>{ setShowTime(e.target.value); }
  //숨김조건
  const [selHideMode,setSelHideMode] = useState('none');
  const fnSelHideMode = (e)=>{ setSelHideMode(e.target.value); }
  const [hidePxSelector,setHidePxSelector] = useState('px');
  const fnhidePxSelector = (e)=>{ setHidePxSelector(e.target.value); }
  const [hideScrollSelector,setHideScrollSelector] = useState('');
  const fnHideScrollSelector = (e)=>{ setHideScrollSelector(e.target.value); }
  const [hideScrollSelectorPx,setHideScrollSelectorPx] = useState(0);
  const fnHideScrollSelectorPx = (e)=>{ setHideScrollSelectorPx(e.target.value); }
  const [hideScrollPxPx,setHideScrollPxPx] = useState(0);
  const fnHideScrollPxPx = (e)=>{ setHideScrollPxPx(e.target.value); }
  const [hideTime,setHideTime] = useState(0);
  const fnHideTime = (e)=>{ setHideTime(e.target.value); }
  //위치&여백 
  const [posY,setPosY] = useState('top');
  const fnPosY = (e)=>{ setPosY(e.target.value); }
  const [posYPx,setPosYPx] = useState(0);
  const fnPosYPx = (e)=>{ setPosYPx(e.target.value); }
  const [posX,setPosX] = useState('left');
  const fnPosX = (e)=>{ setPosX(e.target.value); }
  const [posXPx,setPosXPx] = useState(0);
  const fnPosXPx = (e)=>{ setPosXPx(e.target.value); }
  //z-index
  const [zIndex,setZIndex] = useState(10);
  const fnZIndex = (e)=>{ setPosXPx(e.target.value); }
  //노출제한
  const [limitDay,setLimitDay] = useState(0);
  const fnLimitDay = (e)=>{ setLimitDay(e.target.value); }
  const [limitTime,setLimitTime] = useState(0);
  const fnLimitTime = (e)=>{ setLimitTime(e.target.value); }


  //완료버튼 
  const fnComplete = async ()=>{

    //블릿 텍스트 on 인데 텍스트없으면 경고 
    if(bulletTxt=='on'&&bulletTxtInput==''){
      alertOpen('yellow','블릿 텍스트를 입력하세요.');
      return;
    }

    let data = {
      //기본설정 
      bnType:bnType,                    //배너타입 
      zoneWid:wid,                      //가로사이즈 
      zoneHei:hei,                      //세로사이즈 
      slotW:slotW,                      //슬롯가로갯수 
      slotH:slotH,                      //슬롯세로갯수 
      zoneAcc:zoneAcc,                  //구좌수 
      plf:plf,                          //플랫폼 

      //박스디자인
      zone_shadow : false,              //영역그림자효과 
      boxBorder : boxBorder,            //박스테두리 
      boxBorderPx : boxBorderPx,        //박스테두리두께
      boxBorderColor : boxBorderColor,  //박스테두리색상
      bgColor : bgColor,                //배경색상
      zone_padding : [pt,pr,pb,pl],     //박스패딩 

      //슬롯디자인
      slotGap: slotGap,                 //슬롯간격 
      slotBorder: slotBorder,           //슬롯테두리
      slotBorderPx: slotBorderPx,       //슬롯두께 
      slotBorderColor: slotBorderColor, //슬롯색상

      imgPostion: imgPostion,           //썸네일위치 
      imgTxtGap: imgTxtGap,             //이미지,텍스트 간격 

      fontSize: fontSize,               //폰트사이즈 
      fontWeight: fontWeight,           //폰트굵기 
      fontColor: fontColor,             //폰트색상 
      fontList: fontList,               //폰트리스트 

      textAlignX: textAlignX,           //텍스트정렬 가로
      textAlignY: textAlignY,           //텍스트정렬 세로

      bulletImg: bulletImg,             //블릿 이미지 on, off
      bulletTxt: bulletTxt,             //블릿 텍스트 on, off
      bulletTxtInput: bulletTxtInput,   //블릭 텍스트 입력 
      bulletTxtWeight: bulletTxtWeight, //블릿 텍스트 두께 
      bulletTxtColor: bulletTxtColor,   //블릿 텍스트 색상 
      bulletTxtPx: bulletTxtPx,         //블릿 텍스트 우측띄움
      
    }
    //블릿 이미지,텍스트 

    console.log(data);
    return;

    const res = await fetch('/api/writeFile',{
      method:'POST',
      body:JSON.stringify({path:'./zoneFile/aaa1',data})
    });

    const rs = await res.json();
    console.log('==>',rs);
  }

  useEffect(()=>{

    fn_slotSize();
    
    // const init = async ()=>{
    //   const { TERipple, initTWE, Ripple } = await import("tw-elements");
    //   initTWE({TERipple, Ripple});
    // }
    // init();
    
  },[wid,hei,slotW,slotH,boxBorderPx,pr,pl,slotGap,selEffect]);

  return (
    <div className='p-4'>

      {/* 배너타입 */}
      <div className="flex gap-5 items-center mt-4">
        
        <label
          className="flex flex-col items-center text-center border border-gray-300 rounded-lg p-4 cursor-pointer min-w-[260px] bg-gray-600 text-white hover:bg-gray-500 hover:text-gray-600 hover:shadow-lg"
        >
          <img
            src="https://www.adplex.co.kr/images/content/create_banner1.gif"
            alt="Thumbnail"
            className="h-20 mb-4"
          />
          <div>
          <input
            type="radio"
            name="bnType"
            value="2"
            className="mt-2 mx-2"
            checked={bnType==2}
            onChange={()=>fnBnType(2)}
            />썸네일
            </div>
        </label>

        <label
          className="flex flex-col items-center text-center border border-gray-300 rounded-lg p-4 cursor-pointer min-w-[260px] bg-gray-600 text-white hover:bg-gray-400 hover:text-gray-600 hover:shadow-lg"
        >
          <img
            src="https://www.adplex.co.kr/images/content/create_banner2.gif"
            alt="Thumbnail"
            className="h-20 mb-4"
          />
          <div>

          <input
            type="radio"
            name="bnType"
            value="1"
            className="mt-2 mx-2"
            checked={bnType==1}
            onChange={()=>fnBnType(1)}
            />텍스트
            </div>
        </label>

        <label
          className="flex flex-col items-center text-center border border-gray-300 rounded-lg p-4 cursor-pointer min-w-[260px] bg-gray-600 text-white hover:bg-gray-400 hover:text-gray-600 hover:shadow-lg"
        >
          <img
            src="https://www.adplex.co.kr/images/content/create_banner3.gif"
            alt="Thumbnail"
            className="h-20 mb-4"
          />
          <div>

          <input
            type="radio"
            name="bnType"
            value="0"
            className="mt-2 mx-2"
            checked={bnType==0}
            onChange={()=>fnBnType(0)}
            />이미지
            </div>
        </label>
      </div>
      
      {/* 아코디언 시작 */}

      {/* step1 */}
      <div className="text-sm pt-6">
        <div className="flex" onClick={()=>openStep(1)}>
        <div className={`text-white px-6 py-2 cursor-pointer ${stepActive==1?"' bg-red-600 '":"bg-slate-800"}`}>SETP 1</div>
        <div className='flex-1 px-6 py-2 bg-gray-500 text-white cursor-pointer' id='33333'>기본설정</div>
        </div>
        <div className="">

          <div id="step1" className={`overflow-hidden transition-all duration-300 ${stepActive==1?"max-h-80 ":"max-h-0"}`}>

            {/* 영역사이즈 */}
            <div className="input_form flex text-sm border-b-gray-500 border-b">
              <div className="min-w-[160px] w-1/5 bg-gray-400 p-2 px-6 text-gray-800 font-bold">
                영역사이즈
              </div>  
              <div className="flex-1 bg-gray-300 p-2 px-6">
                <input type="number" className="pl-2 w-16 text-center text-gray-600" value={wid} onChange={fnWidth}/>
                <span className='p-2 text-black'>X</span>
                <input type="number" className="pl-2 w-16 text-center text-gray-600" value={hei} onChange={fnHeight}/>
                <span className='p-2 text-black'>(가로x세로)</span>
              </div>
            </div>

            {/* 슬롯갯수 */}
            <div className="input_form flex text-sm border-b-gray-500 border-b">
              <div className="min-w-[160px] w-1/5 bg-gray-400 p-2 px-6 text-gray-800 font-bold">
                슬롯갯수
              </div>  
              <div className="flex-1 bg-gray-300 p-2 px-6">
                <input type="number" min="1" className="pl-2 w-16 text-center text-gray-600" value={slotW} onChange={fnSlotW}/>
                <span className='p-2 text-black'>X</span>
                <input type="number" min="1" className="pl-2 w-16 text-center text-gray-600" value={slotH} onChange={fnSlotH}/>
                <span className='p-2 text-black'>(1슬롯 실사이즈 : {slotSize})</span>
              </div>
            </div>

            {/* 구좌수 */}
            <div className="input_form flex text-sm border-b-gray-500 border-b">
              <div className="min-w-[160px] w-1/5 bg-gray-400 p-2 px-6 text-gray-800 font-bold">
                구좌수
              </div>  
              <div className="flex-1 bg-gray-300 p-2 px-6">
                <input type="number" className="pl-2 w-16 text-center text-gray-600" value={zoneAcc} onChange={fnZoneAcc}/>
              </div>
            </div>

            {/* 플랫폼 */}
            <div className="input_form flex text-sm">
              <div className="min-w-[160px] w-1/5 bg-gray-400 p-2 px-6 text-gray-800 font-bold">
                플랫폼
              </div>  
              <div className="flex-1 bg-gray-300 p-2 px-6">

                {/* 버튼그룹 */}
                <div
                  className="inline-flex rounded-md shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-500 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  role="group"
                >
                  <button
                    type="button"
                    className={`flex items-center rounded-l-md px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-500 focus:outline-none focus:ring-0 active:bg-primary-700 ${plf=="P"?"bg-primary-500":"bg-gray-400"}`}
                    onClick={()=>fnPlf('P')}
                  >
                    <HiOutlineDesktopComputer size={18} className='mr-1'/>
                    Pc
                  </button>
                  <button
                    type="button"
                    className={`flex items-center rounded-r-md px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-500 focus:outline-none focus:ring-0 active:bg-primary-700 ${plf=="M"?"bg-primary-500":"bg-gray-400"}`}
                    onClick={()=>fnPlf('M')}
                  >
                    <CiMobile3 size={18} className='mr-1'/>
                    Mobile
                  </button>
                </div>
                
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* step2 */}
      <div className="text-sm pt-6">
        <div className="flex" onClick={()=>openStep(2)}>
        <div className={`text-white px-6 py-2 cursor-pointer ${stepActive==2?"' bg-red-600 '":"bg-slate-800"}`}>SETP 2</div>
        <div className='flex-1 px-6 py-2 cursor-pointer bg-gray-500 text-white'>영역디자인</div>
        </div>

        <div className="">
          <div id="step2" className={`overflow-hidden transition-all duration-300 ${stepActive==2?"max-h-90 ":"max-h-0"}`}>
          <div className="w-10/12 mx-auto mt-4">
              {/* 탭 메뉴 */}
              <div className="flex">
                <button
                  className={`py-2 px-4 ${
                    activeTab === "tab1" ? "bg-red-500 font-bold" : "border border-gray-500"
                  }`}
                  onClick={() => setActiveTab("tab1")}
                >
                  Box 디자인
                </button>
                <button
                  className={`py-2 px-4 ${
                    activeTab === "tab2" ? "bg-red-500 font-bold" : "border border-gray-500"
                  }`}
                  onClick={() => setActiveTab("tab2")}
                >
                  Slot 디자인
                </button>
              </div>

              {/* 탭 콘텐츠 */}
              <div className="">
                {activeTab === "tab1" && (
                  <div>

                    <div className="input_form flex text-sm border-b-gray-500 border-b">
                      <div className="flex items-center min-w-[160px] w-1/5 bg-gray-400 p-2 px-6 text-gray-800 font-bold">
                        그림자효과
                      </div>  
                      <div className="flex-1 bg-gray-300 p-2 px-6">
                        <div className="flex items-center">
                          {/* 버튼그룹 */}
                          <div
                            className="mr-2 inline-flex rounded-md shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-500 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                            role="group"
                          >
                            <button
                              type="button"
                              className={`inline-block rounded-l-md px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-500 focus:outline-none focus:ring-0 active:bg-primary-700 ${boxShadow=="N"?"bg-primary-500":"bg-gray-400"}`}
                              onClick={()=>fnBoxShadow('N')}
                            >
                              없음
                            </button>
                            <button
                              type="button"
                              className={`inline-block rounded-r-md px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-500 focus:outline-none focus:ring-0 active:bg-primary-700 ${boxShadow=="Y"?"bg-primary-500":"bg-gray-400"}`}
                              onClick={()=>fnBoxShadow('Y')}
                            >
                              사용
                            </button>
                          </div>
                          <div className="circle m-1">!</div> 박스 그림자 효과 
                        </div>
                      </div>
                    </div>
                    
                    <div className="input_form flex text-sm border-b-gray-500 border-b">
                      <div className="flex items-center min-w-[160px] w-1/5 bg-gray-400 p-2 px-6 text-gray-800 font-bold">
                        테두리 
                      </div>  
                      <div className="flex-1 bg-gray-300 p-2 px-6">

                        {/* 버튼그룹 */}
                        <div
                          className="mr-2 inline-flex rounded-md shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-500 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                          role="group"
                        >
                          <button
                            type="button"
                            className={`inline-block rounded-l-md px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-500 focus:outline-none focus:ring-0 active:bg-primary-700 ${boxBorder=="N"?"bg-primary-500":"bg-gray-400"}`}
                            onClick={()=>fnOutLine('N')}
                          >
                            없음
                          </button>
                          <button
                            type="button"
                            className={`flex items-center px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-500 focus:outline-none focus:ring-0 active:bg-primary-700 ${boxBorder=="S"?"bg-primary-500":"bg-gray-400"}`}
                            onClick={()=>fnOutLine('S')}
                          >
                            <TfiLayoutLineSolid size={16} className='mr-1' />
                            실선
                          </button>
                          <button
                            type="button"
                            className={`flex items-center rounded-r-md px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-500 focus:outline-none focus:ring-0 active:bg-primary-700 ${boxBorder=="D"?"bg-primary-500":"bg-gray-400"}`}
                            onClick={()=>fnOutLine('D')}
                          >
                            <TfiLayoutLineSolid size={16} className='mr-1' />
                            점선
                          </button>
                        </div>
                        {boxBorderLine?(
                          <>
                          <span className='mr-2'> 
                            <input type="number" min="1" className="pl-2 w-16 text-center text-gray-600" value={boxBorderPx} onChange={fnOutLinePx}/> px
                          </span>
                          <input 
                            type="color" 
                            value={boxBorderColor}
                            onChange={fnOutLineColor}
                            style={{ cursor: "pointer", width: "20px", height: "20px", border: "none" }}
                            className='mr-1 bg-gray-300'
                            /> {boxBorderColor}
                        </>
                          ):'' }
                      </div>
                    </div>
                    
                    <div className="input_form flex text-sm border-b-gray-500 border-b">
                      <div className="flex items-center min-w-[160px] w-1/5 bg-gray-400 p-2 px-6 text-gray-800 font-bold">
                        배경색
                      </div>  
                      <div className="flex-1 bg-gray-300 p-2 px-6">

                        {/* 버튼그룹 */}
                        <div
                          className="mr-2 inline-flex rounded-md shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-500 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                          role="group"
                        >
                          <button
                            type="button"
                            className={`inline-block rounded-l-md px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-500 focus:outline-none focus:ring-0 active:bg-primary-700 ${bgColorYN=="N"?"bg-primary-500":"bg-gray-400"}`}
                            onClick={()=>fnBgColorYN('N')}
                          >
                            없음
                          </button>
                          <button
                            type="button"
                            className={`inline-block rounded-r-md px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-500 focus:outline-none focus:ring-0 active:bg-primary-700 ${bgColorYN=="Y"?"bg-primary-500":"bg-gray-400"}`}
                            onClick={()=>fnBgColorYN('Y')}
                          >
                            사용
                          </button>
                        </div>
                        {bgColorYN=="Y"?(
                          <>
                        <input 
                          type="color" 
                          value={bgColor}
                          onChange={fnBgColor}
                          style={{ cursor: "pointer", width: "20px", height: "20px", border: "none" }}
                          className='mr-1 bg-gray-300'
                          /> {bgColor} 
                          </>
                          ):""}
                      </div>
                    </div>
                    
                    <div className="input_form flex text-sm border-b-gray-500 border-b">
                      <div className="flex items-center min-w-[160px] w-1/5 bg-gray-400 p-2 px-6 text-gray-800 font-bold">
                        패딩
                      </div>  
                      <div className="flex-1 bg-gray-300 p-2 px-6 relative">
                        
                        {/* 패딩 박스 */}
                        <span className='absolute top-1 left-[45%]'>
                        <input type="number" min="0" className='w-12 border-2 border-gray-400 rounded text-center text-black' value={pt} onChange={fnPt}/> px
                        </span>
                        <span className='absolute top-24 right-12'>
                        <input type="number" min="0" className='w-12 border-2 border-gray-400 rounded text-center text-black' value={pr} onChange={fnPr}/> px
                        </span>
                        <span className='absolute bottom-1 left-[45%]'>
                        <input type="number" min="0" className='w-12 border-2 border-gray-400 rounded text-center text-black' value={pb} onChange={fnPb}/> px
                        </span>
                        <span className='absolute top-24 left-12'>
                        <input type="number" min="0" className='w-12 border-2 border-gray-400 rounded text-center text-black' value={pl} onChange={fnPl}/> px
                        </span>
                        <div className="w-full flex justify-center p-6">
                          <span className='absolute top-3 left-32 text-xs text-blue-600'>전체영역(Box)</span>
                          <div className="container border-2 border-dashed border-blue-400">
                            <span className='absolute top-3 left-8 text-xs text-blue-600'>패딩&스킨 적용영역</span>
                            <div className="small-box border-2 border-dashed border-blue-400 text-blue-600 flex items-center justify-center">슬롯영역</div>
                            <div className="arrow arrow-top"></div>
                            <div className="arrow arrow-bottom"></div>
                            <div className="arrow arrow-left"></div>
                            <div className="arrow arrow-right"></div>
                          </div>
                        </div>

                      </div>
                    </div>
                    
                  </div>
                )}
                {activeTab === "tab2" && (
                  <div>

                    <div className="input_form flex text-sm border-b-gray-500 border-b">
                      <div className="min-w-[160px] w-1/5 bg-gray-400 p-2 px-6 text-gray-800 font-bold flex items-center">
                        슬롯 간격
                      </div>  
                      <div className="flex-1 bg-gray-300 p-2 px-6 text-black">
                        <input type="number" min="0" className="pl-2 w-16 text-center text-gray-600 border border-black" value={slotGap} onChange={fnSlotGap}/> px
                      </div>
                    </div>

                    <div className="input_form flex text-sm border-b-gray-500 border-b">
                      <div className="min-w-[160px] w-1/5 bg-gray-400 p-2 px-6 text-gray-800 font-bold flex items-center">
                        슬롯 테두리
                      </div>  
                      <div className="flex-1 bg-gray-300 p-2 px-6 text-black">
                        <div
                            className="mr-2 inline-flex rounded-md shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-500 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                            role="group"
                          >
                            <button
                              type="button"
                              className={`border-r border-gray-500 inline-block rounded-l-md px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-500 focus:outline-none focus:ring-0 active:bg-primary-700 ${slotBorder=="N"?"bg-primary-500":"bg-gray-400"}`}
                              onClick={()=>fnSlotBorder('N')}
                            >
                              없음
                            </button>
                            <button
                              type="button"
                              className={`flex items-center border-r border-gray-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-500 focus:outline-none focus:ring-0 active:bg-primary-700 ${slotBorder=="S"?"bg-primary-500":"bg-gray-400"}`}
                              onClick={()=>fnSlotBorder('S')}
                            >
                              <TfiLayoutLineSolid size={16} className='mr-1' />
                              실선
                            </button>
                            <button
                              type="button"
                              className={`flex items-center rounded-r-md px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-500 focus:outline-none focus:ring-0 active:bg-primary-700 ${slotBorder=="D"?"bg-primary-500":"bg-gray-400"}`}
                              onClick={()=>fnSlotBorder('D')}
                            >
                            <TfiLineDotted size={16} className='mr-1' />
                              점선
                            </button>
                        </div>
                        {slotBorder!='N'?(
                            <>
                            <span className='mr-2'> 
                              <input type="number" min="1" className="pl-2 w-16 text-center text-gray-600" value={slotBorderPx} onChange={fnSlotBorderPx}/> px
                            </span>
                            <input 
                              type="color" 
                              value={slotBorderColor}
                              onChange={fnSlotBorderColor}
                              style={{ cursor: "pointer", width: "20px", height: "20px", border: "none" }}
                              className='mr-1 bg-gray-300'
                              /> {slotBorderColor}
                          </>
                            ):'' }
                      </div>
                    </div>
                    
                    <div className={`input_form flex text-sm border-b-gray-500 border-b ${bnType==2?'':'hidden'}`}>
                      <div className="min-w-[160px] w-1/5 bg-gray-400 p-2 px-6 text-gray-800 font-bold flex items-center">
                        썸네일 설정
                      </div>  
                      <div className="flex-1 bg-gray-300">

                        <div className='border-b-gray-500 border-b text-black'>
                          <div className='flex p-2 px-6'>
                            <div className='flex items-center m-2'>위치 </div>
                            <div>
                              <div
                              className="mr-2 inline-flex rounded-md shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-500 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                              role="group"
                              >
                                <button
                                  type="button"
                                  className={`flex items-center border-r border-gray-500 rounded-l-md px-3 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-500 focus:outline-none focus:ring-0 active:bg-primary-700 ${imgPostion=="T"?"bg-primary-500":"bg-gray-400"}`}
                                  onClick={()=>fnImgPostion('T')}
                                >
                                  <LuArrowUpToLine size={16} className='mr-1' />
                                  상단
                                </button>
                                <button
                                  type="button"
                                  className={`flex items-center border-r border-gray-500 px-3 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-500 focus:outline-none focus:ring-0 active:bg-primary-700 ${imgPostion=="B"?"bg-primary-500":"bg-gray-400"}`}
                                  onClick={()=>fnImgPostion('B')}
                                  >
                                  <LuArrowDownToLine size={16} className='mr-1' />
                                  하단
                                </button>
                                <button
                                  type="button"
                                  className={`flex items-center border-r border-gray-500 px-3 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-500 focus:outline-none focus:ring-0 active:bg-primary-700 ${imgPostion=="L"?"bg-primary-500":"bg-gray-400"}`}
                                  onClick={()=>fnImgPostion('L')}
                                >
                                  <LuArrowLeftToLine size={16} className='mr-1' />
                                  좌측
                                </button>
                                <button
                                  type="button"
                                  className={`flex items-center rounded-r-md px-3 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-500 focus:outline-none focus:ring-0 active:bg-primary-700 ${imgPostion=="R"?"bg-primary-500":"bg-gray-400"}`}
                                  onClick={()=>fnImgPostion('R')}
                                >
                                  <LuArrowRightToLine size={16} className='mr-1' />
                                  우측
                                </button>
                              </div>
                              
                            </div>
                          </div>
                        </div>

                        <div className='text-black'>
                          <div className='flex p-2 px-6 items-center'>
                            <div className='flex items-center m-2'>간격 </div>
                            <div className='flex items-center'>
                              <input type="number" className="mr-1 pl-2 w-16 text-center text-gray-600 border border-black" value={imgTxtGap} onChange={fnImgTxtGap}/> px
                            </div>
                            <BsExclamationCircle size={16} className='ml-2 mr-1 text-red-500'/> 이미지, 텍스트 간격
                          </div>
                        </div>

                      </div>
                    </div>

                    <div className={`input_form flex text-sm border-b-gray-500 border-b ${bnType==0?'hidden':''}`}>
                      <div className="min-w-[160px] w-1/5 bg-gray-400 p-2 px-6 text-gray-800 font-bold flex items-center">
                        폰트 설정 
                      </div>  
                      <div className="flex-1 bg-gray-300 p-2 px-6 text-black">
                        <ul>
                          <li>
                            {/* 기본스타일 */}
                            <input type="number" className="pl-2 w-16 text-center text-gray-600 border border-black" value={fontSize} onChange={fnFontSize}/> px

                            <button className={`mx-2 px-1 w-6 rounded border border-gray-400 ${fontWeight?"font-bold bg-gray-400":"bg-gray-200"}`} onClick={isFontWeight}>B</button>
                            
                            {/* 폰트색상 */}
                            <input 
                              type="color" 
                              value={fontColor}
                              onChange={fnFontColor}
                              style={{ cursor: "pointer", width: "20px", height: "20px", border: "none" }}
                              className='mx-1 bg-gray-300'
                              /> {fontColor}
                          </li>
                          <li>
                            <select id="slt_font_family" className='w-32 my-1 border border-black' value={selFont} onChange={fnSelFont}>
                              <option value="">폰트선택</option>
                              <optgroup label="-------------------"></optgroup>
                              <option value="Noto Sans KR">Noto Sans KR</option>
                              <option value="Nanum Gothic">Nanum Gothic</option>
                              <option value="Malgun Gothic">Malgun Gothic</option>
                              <option value="Arial">Arial</option>
                              <option value="Tahoma">Tahoma</option>
                              <option value="Helvetica">Helvetica</option>
                              <option value="Apple SD Gothic Neo">Apple SD Gothic Neo</option>
                            </select>                        
                          </li>
                          <li>
                            <div id ="fontListBtn" className="bg-sky-100 border border-sky-300 p-1">
                              <button className='bg-white border border-gray-300 px-1'>sans-serif</button>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className={`input_form flex text-sm border-b-gray-500 border-b ${bnType==0?'hidden':''}`}>
                      <div className="min-w-[160px] w-1/5 bg-gray-400 p-2 px-6 text-gray-800 font-bold flex items-center">
                        텍스트 정렬
                      </div>  
                      <div className="flex-1 bg-gray-300 p-2 px-6 text-black">
                        <div
                            className="mr-2 inline-flex rounded-md shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-500 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                            role="group"
                          >
                            <button
                              type="button"
                              className={`flex items-center border-r border-gray-500 rounded-l-md px-3 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-500 focus:outline-none focus:ring-0 active:bg-primary-700 ${textAlignX=="L"?"bg-primary-500":"bg-gray-400"}`}
                              onClick={()=>fnTextAlignX('L')}
                            >
                              <LuArrowLeftToLine size={16} className='mr-1' />
                              좌측
                            </button>
                            <button
                              type="button"
                              className={`flex items-center border-r border-gray-500 px-3 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-500 focus:outline-none focus:ring-0 active:bg-primary-700 ${textAlignX=="C"?"bg-primary-500":"bg-gray-400"}`}
                              onClick={()=>fnTextAlignX('C')}
                            >
                              <BsArrowsCollapseVertical size={16} className='mr-1' />
                              중앙
                            </button>
                            <button
                              type="button"
                              className={`flex items-center rounded-r-md px-3 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-500 focus:outline-none focus:ring-0 active:bg-primary-700 ${textAlignX=="R"?"bg-primary-500":"bg-gray-400"}`}
                              onClick={()=>fnTextAlignX('R')}
                            >
                              <LuArrowRightToLine size={16} className='mr-1' />
                              우측
                            </button>
                        </div>                        

                        <div
                            className="mr-2 inline-flex rounded-md shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-500 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                            role="group"
                          >
                            <button
                              type="button"
                              className={`flex items-center border-r border-gray-500 rounded-l-md px-3 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-500 focus:outline-none focus:ring-0 active:bg-primary-700 ${textAlignY=="T"?"bg-primary-500":"bg-gray-400"}`}
                              onClick={()=>fnTextAlignY('T')}
                            >
                              <LuArrowUpToLine size={16} className='mr-1' />
                              상단
                            </button>
                            <button
                              type="button"
                              className={`flex items-center border-r border-gray-500 px-3 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-500 focus:outline-none focus:ring-0 active:bg-primary-700 ${textAlignY=="M"?"bg-primary-500":"bg-gray-400"}`}
                              onClick={()=>fnTextAlignY('M')}
                            >
                              <BsArrowsCollapse size={16} className='mr-1' />
                              중단
                            </button>
                            <button
                              type="button"
                              className={`flex items-center rounded-r-md px-3 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-500 focus:outline-none focus:ring-0 active:bg-primary-700 ${textAlignY=="B"?"bg-primary-500":"bg-gray-400"}`}
                              onClick={()=>fnTextAlignY('B')}
                            >
                              <LuArrowDownToLine size={16} className='mr-1' />
                              하단
                            </button>
                        </div>                        

                      </div>
                    </div>

                    <div className={`input_form flex text-sm border-b-gray-500 border-b ${bnType==0?'hidden':''}`}>
                      <div className="min-w-[160px] w-1/5 bg-gray-400 p-2 px-6 text-gray-800 font-bold flex items-center">
                        블릿 설정
                      </div>
                      <div className="flex-1 bg-gray-300 p-2 px-6 text-black">
                        <div className='mb-1 pb-1'>
                          <button
                            className={`w-32 border border-gray-400 rounded ${bulletImg=='on'?'bg-primary-500 text-white':'bg-gray-400 text-white'}`}
                            onClick={fnBulletImg}
                            >
                          이미지블릿 {bulletImg}
                          </button>
                          <div className={`border-gray-500 p-1 ${bulletImg=='on'?'':'hidden'}`}>
                            <CiImageOn size={40} className='border border-gray-500 rounded '></CiImageOn>
                          </div>
                        </div>
                        <div>
                          <button
                            className={`w-32 border border-gray-400 rounded ${bulletTxt=='on'?'bg-primary-500 text-white':'bg-gray-400 text-white'}`}
                            onClick={fnBulletTxt}
                            >
                          텍스트블릿 {bulletTxt}
                          </button>
                          <div className={`p-1 ${bulletTxt=='on'?'':'hidden'}`}>
                            <div className="">Text 입력
                              <input type="text" className="ml-1 pl-2 w-16 text-center text-gray-600 border border-black" value={bulletTxtInput} onChange={fnBulletTxtInput}/>

                              <button className={`mx-2 px-1 w-6 rounded border border-gray-400 ${bulletTxtWeight?"font-bold bg-gray-400":"bg-gray-200"}`} onClick={fnBulletTxtWeight}>B</button>

                              {/* 폰트색상 */}
                              <input 
                                type="color" 
                                value={bulletTxtColor}
                                onChange={fnBulletTxtColor}
                                style={{ cursor: "pointer", width: "20px", height: "20px", border: "none" }}
                                className='mx-1 bg-gray-300'
                                /> {bulletTxtColor}
                              블릿 우측띄움 
                              <input type="number" className="pl-2 w-16 text-center text-gray-600 border border-black" value={bulletTxtPx} onChange={fnBulletTxtPx}/> px

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="input_form flex text-sm border-b-gray-500 border-b">
                      <div className="min-w-[160px] w-1/5 bg-gray-400 p-2 px-6 text-gray-800 font-bold flex items-center">
                        슬롯간 간격
                      </div>  
                      <div className="flex-1 bg-gray-300 p-2 px-6">
                        <input type="number" min="0" className="pl-2 w-16 text-center text-gray-600 border border-black" value={slotGap} onChange={fnSlotGap}/> px
                      </div>
                    </div>

                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* step3 */}
      <div className="text-sm pt-6">
        <div className="flex" onClick={()=>openStep(3)}>
          <div className={`text-white px-6 py-2 cursor-pointer ${stepActive==3?"' bg-red-600 '":"bg-slate-800"}`}>SETP 3</div>
          <div className='flex-1 px-6 py-2 cursor-pointer bg-gray-500 text-white'>플로팅설정</div>
        </div>
        
        <div id="step3" className={`overflow-hidden transition-all duration-300 ${stepActive==3?"max-h-120 ":"max-h-0"}`}>

          {/* 영역사이즈 */}
          <div className="input_form flex text-sm border-b-gray-500 border-b">
            <div className="flex items-center min-w-[160px] w-1/5 bg-gray-400 px-6 text-gray-800 font-bold">
              플로팅 배너
            </div>  
            <div className="flex-1 bg-gray-300 p-2 px-6">              
              {/* 버튼그룹 */}
              <div
                className="mr-2 inline-flex rounded-md shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out"
                role="group"
              >
                <button
                  type="button"
                  className={`inline-block rounded-l-md px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-500 focus:outline-none focus:ring-0 active:bg-primary-700 ${flotYN=="N"?"bg-primary-500":"bg-gray-400"}`}
                  onClick={()=>fnFlotYN('N')}
                >
                  없음
                </button>
                <button
                  type="button"
                  className={`inline-block rounded-r-md px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-500 focus:outline-none focus:ring-0 active:bg-primary-700 ${flotYN=="Y"?"bg-primary-500":"bg-gray-400"}`}
                  onClick={()=>fnFlotYN('Y')}
                >
                  사용
                </button>
              </div>
              
            </div>            
          </div>

          {/* 플로팅 설정메뉴 */}
          {flotYN=='Y'?(
          <>
          <div className="input_form flex text-sm border-b-gray-500 border-b">
            <div className="flex items-center min-w-[160px] w-1/5 bg-gray-400 px-6 text-gray-800 font-bold">
              스크롤 효과
            </div>  
            <div className="flex-1 bg-gray-300 p-2 px-6">
              <select className='w-32 my-1 border border-black text-black' value={selfixed} onChange={fnSelfixed}>
                <option value="scrollFix">스크롤고정</option>
                <option value="postionFix">위치고정</option>
              </select>
            </div>            
          </div>          

          <div className="input_form flex text-sm border-b-gray-500 border-b">
            <div className="flex items-center min-w-[160px] w-1/5 bg-gray-400 px-6 text-gray-800 font-bold">
              노출효과
            </div>  
            <div className="flex-1 bg-gray-300 p-2 px-6">
              <select className='w-32 my-1 border border-black text-black' value={selEffect} onChange={fnSelEffect}>
                <option value="none">효과없음</option>
                <option value="fadeIn">페이드인</option>
                <option value="slidebt">아래-위</option>
                <option value="slidetb">위-아래</option>
                <option value="slidelr">좌-우</option>
                <option value="sliderl">우-좌</option>
              </select>
            </div>
          </div>
          <div className="input_form flex text-sm border-b-gray-500 border-b">
            <div className="flex items-center min-w-[160px] w-1/5 bg-gray-400 px-6 text-gray-800 font-bold">
              첫노출조건
            </div>  
            <div className="flex-1 bg-gray-300 p-2 px-6">
              <select className='w-32 my-1 border border-black text-black' value={selShowMode} onChange={fnSelShowMode}>
                <option value="now">즉시노출</option>
                <option value="scroll">스크롤</option>
                <option value="time">시간지연</option>
              </select>
              {selShowMode=='scroll'?(
                <div className="inline-block mx-1">
                  <div className="flex item-left text-black">
                    <div className="px-1">
                      <select className='w-32 border border-black' value={pxSelector} onChange={fnPxSelector}>
                        <option value="px">px지정</option>
                        <option value="selector">셀렉터</option>
                      </select>
                    </div>
                    {pxSelector=='selector'?(
                    <>
                      <input type="text" className='mx-1 w-32 border border-black text-right' value={scrollSelector} onChange={fnScrollSelector}/>
                      <input type="number" className='mx-1 w-20 border border-black text-right' value={scrollSelectorPx} onChange={fnScrollSelectorPx}/>px
                    </>
                    ):(
                    <>
                      <input type="number" className='mx-1 w-20 border border-black text-right' value={scrollPxPx} onChange={fnSetScrollPxPx}/>px
                    </>
                    )}
                  </div>
                </div>
              ):selShowMode=='time'?(
                <div className="inline-block mx-1">
                  <input type="number" className='mx-1 w-20 border border-black text-right text-black' value={showTime} onChange={fnShowTime}/>초
                </div>
              ):''}
            </div>
          </div>

          <div className="input_form flex text-sm border-b-gray-500 border-b">
            <div className="flex items-center min-w-[160px] w-1/5 bg-gray-400 px-6 text-gray-800 font-bold">
              숨김조건
            </div>  
            <div className="flex-1 bg-gray-300 p-2 px-6">
              <select className='w-32 my-1 border border-black text-black' value={selHideMode} onChange={fnSelHideMode}>
                <option value="none">사용안함</option>
                <option value="scroll">스크롤</option>
                <option value="time">시간지연</option>
              </select>
              {selHideMode=='scroll'?(
                <div className="inline-block mx-1">
                  <div className="flex item-left text-black">
                    <div className="px-1">
                      <select className='w-32 border border-black' value={hidePxSelector} onChange={fnhidePxSelector}>
                        <option value="px">px지정</option>
                        <option value="selector">셀렉터</option>
                      </select>
                    </div>
                    {hidePxSelector=='selector'?(
                    <>
                      <input type="text" className='mx-1 w-32 border border-black text-right' value={hideScrollSelector} onChange={fnHideScrollSelector}/>
                      <input type="number" className='mx-1 w-20 border border-black text-right' value={hideScrollSelectorPx} onChange={fnHideScrollSelectorPx}/>px
                    </>
                    ):(
                    <>
                      <input type="number" className='mx-1 w-20 border border-black text-right' value={hideScrollPxPx} onChange={fnHideScrollPxPx}/>px
                    </>
                    )}
                  </div>
                </div>
              ):selHideMode=='time'?(
                <div className="inline-block mx-1">
                  <input type="number" className='mx-1 w-20 border border-black text-right text-black' value={hideTime} onChange={fnHideTime}/>초
                </div>
              ):''}              
            </div>
          </div>

          <div className="input_form flex text-sm border-b-gray-500 border-b">
            <div className="flex items-center min-w-[160px] w-1/5 bg-gray-400 px-6 text-gray-800 font-bold">
              위치&여백
            </div>  
            <div className="flex-1 bg-gray-300 p-2 px-6 text-black">
              <select className='w-32 my-1 border border-black text-black' value={posY} onChange={fnPosY}>
                <option value="top">상단기준</option>
                <option value="middle">중단기준</option>
                <option value="bottom">하단기준</option>
              </select>
              <input type="number" className='mx-1 w-20 border border-black text-right text-black' value={posYPx} onChange={fnPosYPx}/>px
              <select className='w-32 mx-1 border border-black text-black' value={posX} onChange={fnPosX}>
                <option value="left">왼쪽기준</option>
                <option value="center">중앙기준</option>
                <option value="right">오른쪽기준</option>
              </select>
              <input type="number" className='mx-1 w-20 border border-black text-right text-black' value={posXPx} onChange={fnPosXPx}/>px
            </div>
          </div>

          <div className="input_form flex text-sm border-b-gray-500 border-b">
            <div className="flex items-center min-w-[160px] w-1/5 bg-gray-400 px-6 text-gray-800 font-bold">
              Z-INDEX
            </div>  
            <div className="flex-1 bg-gray-300 p-2 px-6 text-black">
              <input type="number" className='mx-1 w-20 border border-black text-right text-black' value={zIndex} onChange={fnZIndex}/>
            </div>
          </div>

          <div className="input_form flex text-sm border-b-gray-500 border-b">
            <div className="flex items-center min-w-[160px] w-1/5 bg-gray-400 px-6 text-gray-800 font-bold">
              노출제한 
            </div>  
            <div className="flex-1 bg-gray-300 p-2 px-6 text-black">
              <input type="number" className='mx-1 w-20 border border-black text-right text-black' value={limitDay} onChange={fnLimitDay}/>일 
              <input type="number" className='mx-1 w-20 border border-black text-right text-black' value={limitTime} onChange={fnLimitTime}/>시간 
            </div>
          </div>

          </>
          ):''}
        </div>
      </div>

      <div className="text-sm pt-6">
        <div className="text-white px-6 py-2 bg-slate-800 text-center">
          <button className='p-1 px-4 border bg-red-500' onClick={fnComplete}>완료</button>
        </div>
      </div>

      {alertView ? (
        <AlertColor
          alertColor={alertColor}
          alertMsg={alertMsg}
          alertClose={alertClose}
        ></AlertColor>
      ) : (
        ""
      )}

    </div>
  )
}

export default page
