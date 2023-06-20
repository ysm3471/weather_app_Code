import React, { createContext, useState, useEffect, useRef } from 'react';
import DateInfo from './DateInfo';
import GetInfo from './GetInfo';
import Loading from './Loading';
import LocationConverter from './LocationConverter';

export const WeatherContext = createContext();

export default function WeatherProvider({ children }) {
  let today = new Date();
  const todayDate = DateInfo(today);    // 날짜정보를 지정한 형식으로 변환시켜주는 함수

  const [info, setInfo] = useState({});   // 불러온 정보를 저장하는 배열
  const [state, setState] = useState({});   // api의 호출 상태를 저장하는 배열
  const [on, setOn] = useState(false);    // api의 호출 완료를 표시하는 state
  const [ready, getReady] = useState(false);    // api 처리의 완료를 표시하는 state
  const [number, setNumber] = useState(1);    // api의 페이지넘버
  const [howPer, setHowPer] = useState(50);   // 사용자가 설정한 강수량을 표시하는 state


  useEffect(() => {
    setOn(false)    
    GetInfo(todayDate, number,convertLoaction.x,convertLoaction.y)    // 오늘 날짜와 페이지넘버, 가공된 x,y좌표를 변수로 받음
      .then(res => {
        if (number < 4) {   // 3페이지까지 저장
          setInfo({ ...info, [number]: res.response.body.items.item });
          setState({ ...info, [number]: res.response.header });
          setNumber(num => num + 1)
        }
        else {    // 3페이지까지 저장했다면 준비완료
          setOn(true);
        }
      })
      .catch(error => {
        setNumber(1);
        console.log(error,"에러가 발생했습니다")})
  }, [number])

  let changeDate = useRef(new Date());    // 바뀌는 날짜를 저장하는 변수
  let date = useRef(DateInfo(changeDate.current));    // 바뀐 날짜를 가공해서 저장하는 변수
  const [num, setNum] = useState(1);    // api 처리를 위한 state
  const [page, setPage] = useState(1);    // api 처리를 위한 state
  const [TMN, setTMN] = useState({});   // 최고기온을 저장하는 state
  const [TMX, setTMX] = useState({});   // 최저기온을 저장하는 state
  const [rain, setRain] = useState({});   // 강수확률을 저장하는 state

  let rainList = useRef([]);    // 강수확률을 임시저장하는 배열


  useEffect(() => {
    getReady(false)
    if (on) {
      let TMNres = info[page].find((aa) => { return aa.fcstDate === date.current && aa.category === "TMN" })    // 각 페이지의 TMN을 저장
      let TMXres = info[page].find((aa) => { return aa.fcstDate === date.current && aa.category === "TMX" })    // 각 페이지의 TMX를 저장
      let rainres = info[page].filter((aa) => { return aa.fcstDate === date.current && aa.category === "POP" })   // 각 페이지의 강수확률을 배열로 저장

      if (rainres[rainres.length - 1].fcstTime === "2300") {    // 찾은 결과의 마지막요소가 fcstTime이 23시일경우
        for (let key in rainres) {    // 임시 저장소에 병합 후 저장함
          rainList.current.push(rainres[key])
        }
        setRain({ ...rain, [num]: rainList.current })
        rainList.current = [];    // 임시 저장소 초기화
      }
      else {    // 23시가 아닐경우
        for (let key in rainres) {
          rainList.current.push(rainres[key])   // 임시저장소에 저장함
        }
      }


      switch (false) {    // 왜인지는 모르겠는데 그냥 배열을 괄호 안에 넣으면 true로 인식하지 않음. 그래서 !연산자를 사용해 불리언 값으로 만든 다음에 스위치문을 돌림
        case (!(TMXres) || !(TMNres)):   // TMX와 TMN을 전부 찾았을 경우 저장함
          setTMN({ ...TMN, [num]: TMNres.fcstValue })   
          setTMX({ ...TMX, [num]: TMXres.fcstValue })
          if (num < 3) {    // 3회 반복을 위한 조건문
            changeDate.current = new Date(changeDate.current.setDate(changeDate.current.getDate() + 1));    // 저장할 때 마다 날짜를 1 증가시킴
            date.current = DateInfo(changeDate.current);
            setNum(num => num + 1)
          }
          else {
            getReady(true)    // num이 3일 경우 렌더링을 시작함
          }
          break;
        case (!(TMNres)):   // TMN만 찾았을 경우
          setTMN({ ...TMN, [num]: TMNres.fcstValue });
          setPage(num => num + 1);    // page만 넘김
          break;
        case (!(TMXres)):   // TMX만 찾았을 경우
          setTMN({ ...TMX, [num]: TMXres.fcstValue })
          setPage(num => num + 1)
          break;
        default:    // 아무것도 못 찾았을 경우
          if (page < 3) {
            setPage(num => num + 1);
          }
          break;
      }
    }
  }, [num, page, on])



  const [bgToggle, setbgToggle] = useState(true);   // 배경 스위치
  const [settingToggle, setSettingToggle] = useState(false);    // 환경설정 스위치
  const [changeWeather, setChangeWeather] = useState("default");    // 개발자툴
  const [userAddress, setUserAddress] = useState(false);    // 유저가 지도에서 선택한 주소
  const [userAddressList, setUserAddressList] = useState([    //  유저의 주소 및 위치정보를 저장하는 배열
    {
      id: 0,
      address: "서울특별시, 중구",
      selected:true,    // 북마크 표시를 위한 요소
      Ma:37.5620769169639,    // 위도
      La:126.984901336292,    // 경도
    }
  ])
  const [userLocation, setUserLoaction] = useState(null);   // 유저가 지도에서 선택한 좌표값
  const [convertLoaction,setConvertLocation] = useState({   // 선택 지역의 좌표값
    x:60,
    y:127
  });    

  useEffect(() => {
    if (userAddressList) {    // userAddressList가 변경될 때마다 selected가 true인 요소의 좌표값을 변환시킴
      const searchList = userAddressList.find((aa) => aa.selected)
      const loaction = LocationConverter("toXY", searchList.Ma, searchList.La)    // 좌표값을 받으면 격자좌표로 변환시켜주는 함수
      setConvertLocation(loaction);
    }
  }, [userAddressList])  

  function bgToggleBtn() { 
    setbgToggle((show) => !show)
  }
  function settingToggleBtn() {
    setSettingToggle((show) => !show)
  }
  function refreshBtn() {   // 새로고침 버튼을 누르면 페이지넘버 초기화
    setNumber(1);
  }

  return (
    <>
      {!(ready) && <Loading />}
      {ready && <WeatherContext.Provider
        value={{
          changeWeather,
          setChangeWeather,
          bgToggle,
          bgToggleBtn,
          settingToggle,
          settingToggleBtn,
          setInfo,
          info,
          state,
          TMN,
          TMX,
          rain,
          setRain,
          howPer,
          setHowPer,
          refreshBtn,
          userAddress,
          setUserAddress,
          userLocation,
          setUserLoaction,
          convertLoaction,
          userAddressList, 
          setUserAddressList
        }}>
        {children}
      </WeatherContext.Provider>}
    </>
  )
}
