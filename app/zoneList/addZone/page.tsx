'use client'
import React, { useEffect, useState } from 'react'
import "../../../css/zoneBox.css"
import "react-color-palette/dist/css/rcp.css"

const page = () => {

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

  //테두리 
  const [outLine,setOutLine] = useState('N');         //테두리 없음:N,실선:S,점선:D
  const [outLineOpt,setOutLineOpt] = useState(false); //테두리 옵션 
  const [outLinePx,setOutLinePx] = useState(1);       //테두리 두께 
  const [outLineColor,setOutLineColor] = useState('#fff'); //테두리 색상
  const fnOutLine = (type)=>{ 
    setOutLineOpt((type=='N'?false:true));
    setOutLine(type);
    fn_slotSize();
  }
  const fnOutLinePx = (e)=>{ setOutLinePx(e.target.value); fn_slotSize(); }
  const fnOutLineColor = (e)=>{ setOutLineColor(e.target.value); }
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


  const fnName = (e)=>{ setName(e.target.value); }
  const fnWidth = (e)=>{ setWid(parseInt(e.target.value)); fn_slotSize(); }
  const fnHeight = (e)=>{ setHei(parseInt(e.target.value)); fn_slotSize(); }
  const fnSlotW = (e)=>{ setSlotW(parseInt(e.target.value)); fn_slotSize(); }
  const fnSlotH = (e)=>{ setSlotH(parseInt(e.target.value)); fn_slotSize(); }
  const fnZoneAcc = (e)=>{ setZoneAcc(parseInt(e.target.value)); }

  const openStep = (no)=>{ setStepActive(no); }   //step이동
  const fnBnType = (no)=>{ setBnType(no); }       //배터타입 선택 

  const [activeTab, setActiveTab] = useState("tab1");

  //슬롯갯수 실시간 슬롯사이즈 계산 
  const [slotSize,setSlotSize] = useState('');      //슬롯갯수 적용한 1슬롯 실사이즈 
  const fn_slotSize = ()=>{
      //실사이즈 가로 = 가로-(테두리두께+박스패딩 좌,우+슬롯간격+슬롯두께)
      const w = String((wid - ( (outLine=='Y'?(outLinePx*2):0) + (pr+pl) + (slotGap*slotW) ))/slotW).split('.');
      const h = String((hei - ( (outLine=='Y'?(outLinePx*2):0) + (pt+pb) + (slotGap*slotH) ))/slotH).split('.');
      setSlotSize(w[0]+"x"+h[0]);
  }

  useEffect(()=>{

    fn_slotSize();
    
    // const init = async ()=>{
    //   const { TERipple, initTWE, Ripple } = await import("tw-elements");
    //   initTWE({TERipple, Ripple});
    // }
    // init();
    
  },[wid,hei,slotW,slotH,outLinePx,pr,pl,slotGap]);

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
      <div className="text-sm pt-6 cursor-pointer">
        <div className="flex" onClick={()=>openStep(1)}>
        <div className={`text-white px-6 py-2 ${stepActive==1?"' bg-red-600 '":"bg-slate-800"}`}>SETP 1</div>
        <div className='flex-1 px-6 py-2 bg-gray-500 text-white' id='33333'>기본설정</div>
        </div>
        <div className="overflow-hidden">

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
                <span className='p-2 text-black'>({slotW}x{slotH})</span>
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
                  className="inline-flex rounded-md shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  role="group"
                >
                  <button
                    type="button"
                    className={`inline-block rounded-l-md px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700 ${plf=="P"?"bg-primary-700":"bg-gray-400"}`}
                    onClick={()=>fnPlf('P')}
                  >
                    Pc
                  </button>
                  <button
                    type="button"
                    className={`inline-block rounded-r-md px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700 ${plf=="M"?"bg-primary-700":"bg-gray-400"}`}
                    onClick={()=>fnPlf('M')}
                  >
                    Mobile
                  </button>
                </div>
                
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* step2 */}
      <div className="text-sm pt-6 cursor-pointer">
        <div className="flex" onClick={()=>openStep(2)}>
        <div className={`text-white px-6 py-2 ${stepActive==2?"' bg-red-600 '":"bg-slate-800"}`}>SETP 2</div>
        <div className='flex-1 px-6 py-2 bg-gray-500 text-white'>영역디자인</div>
        </div>

        <div className="overflow-hidden">
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

                        {/* 버튼그룹 */}
                        <div
                          className="mr-2 inline-flex rounded-md shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                          role="group"
                        >
                          <button
                            type="button"
                            className={`inline-block rounded-l-md px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700 ${boxShadow=="N"?"bg-primary-700":"bg-gray-400"}`}
                            onClick={()=>fnBoxShadow('N')}
                          >
                            없음
                          </button>
                          <button
                            type="button"
                            className={`inline-block rounded-r-md px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700 ${boxShadow=="Y"?"bg-primary-700":"bg-gray-400"}`}
                            onClick={()=>fnBoxShadow('Y')}
                          >
                            사용
                          </button>
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
                          className="mr-2 inline-flex rounded-md shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                          role="group"
                        >
                          <button
                            type="button"
                            className={`inline-block rounded-l-md px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700 ${outLine=="N"?"bg-primary-700":"bg-gray-400"}`}
                            onClick={()=>fnOutLine('N')}
                          >
                            없음
                          </button>
                          <button
                            type="button"
                            className={`inline-block px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700 ${outLine=="S"?"bg-primary-700":"bg-gray-400"}`}
                            onClick={()=>fnOutLine('S')}
                          >
                            실선
                          </button>
                          <button
                            type="button"
                            className={`inline-block rounded-r-md px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700 ${outLine=="D"?"bg-primary-700":"bg-gray-400"}`}
                            onClick={()=>fnOutLine('D')}
                          >
                            점선
                          </button>
                        </div>
                        {outLineOpt?(
                          <>
                          <span className='mr-2'> 
                            <input type="number" min="1" className="pl-2 w-16 text-center text-gray-600" value={outLinePx} onChange={fnOutLinePx}/> px
                          </span>
                          <input 
                            type="color" 
                            value={outLineColor}
                            onChange={fnOutLineColor}
                            style={{ cursor: "pointer", width: "20px", height: "20px", border: "none" }}
                            className='mr-1 bg-gray-300'
                            /> {outLineColor}
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
                          className="mr-2 inline-flex rounded-md shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                          role="group"
                        >
                          <button
                            type="button"
                            className={`inline-block rounded-l-md px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700 ${bgColorYN=="N"?"bg-primary-700":"bg-gray-400"}`}
                            onClick={()=>fnBgColorYN('N')}
                          >
                            없음
                          </button>
                          <button
                            type="button"
                            className={`inline-block rounded-r-md px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700 ${bgColorYN=="Y"?"bg-primary-700":"bg-gray-400"}`}
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
                      <div className="min-w-[160px] w-1/5 bg-gray-400 p-2 px-6 text-gray-800 font-bold">
                        슬롯간격
                      </div>  
                      <div className="flex-1 bg-gray-300 p-2 px-6">
                        <input type="number" min="0" className="pl-2 w-16 text-center text-gray-600" value={slotGap} onChange={fnSlotGap}/>
                      </div>
                    </div>

                    <div className="input_form flex text-sm border-b-gray-500 border-b">
                      <div className="min-w-[160px] w-1/5 bg-gray-400 p-2 px-6 text-gray-800 font-bold">
                        슬롯간격
                      </div>  
                      <div className="flex-1 bg-gray-300 p-2 px-6">
                        <input type="number" min="0" className="pl-2 w-16 text-center text-gray-600" value={slotGap} onChange={fnSlotGap}/>
                      </div>
                    </div>

                    <div className="input_form flex text-sm border-b-gray-500 border-b">
                      <div className="min-w-[160px] w-1/5 bg-gray-400 p-2 px-6 text-gray-800 font-bold">
                        슬롯간 간격
                      </div>  
                      <div className="flex-1 bg-gray-300 p-2 px-6">
                        <input type="number" className="pl-2 w-16 text-center text-gray-600" value={zoneAcc} onChange={fnZoneAcc}/>
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
      <div className="text-sm pt-6 cursor-pointer">
        <div className="flex" onClick={()=>openStep(3)}>
          <div className={`text-white px-6 py-2 ${stepActive==3?"' bg-red-600 '":"bg-slate-800"}`}>SETP 3</div>
          <div className='flex-1 px-6 py-2 bg-gray-500 text-white'>노출설정</div>
        </div>
        <div id="step2" className={`rounded ${stepActive==2?"":"hidden"}`}>

        </div>
      </div>


    </div>
  )
}

export default page
