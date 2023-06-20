import { useContext, useEffect} from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import NextWeather from './components/Main/NextWeather/NextWeather';
import TodayWeather from './components/Main/TodayWeather/TodayWeather';
import AppSetting from './components/AppSetting/AppSetting';
import { WeatherContext } from './components/Store/WeatherProvider';


function App() {
  const { bgToggle, info, rain ,howPer, setUserAddressList } = useContext(WeatherContext);

  useEffect(() => {   // 새로고침 시에 로컬스토리지에서 정보를 가져옴
    
    let myArr = localStorage.getItem('watched');

    if (myArr) {
      myArr = JSON.parse(myArr);

      setUserAddressList(myArr);      
    }
  },[])

  const today = new Date();
  const now = today.getHours();   // 현재 시간을 가져옴

  let weather = "normal"    // 날씨 기본 상태
  const isRainy = rain[1].find((aa) => Number(aa.fcstValue) >= Number(howPer) && Number(aa.fcstTime) >= Number(now)*100)    // 금일 현재 시간 이후의 강수량이 지정한 강수량 이상인 값을 검색

  if (isRainy) {   // 검색값이 존재할 경우
    const how = info[1].find((aa) => aa.fcstTime === isRainy.fcstTime && aa.category === "PTY")   // 검색한 값의 시간에 내리는게 눈인지 비인지 확인
    if (how.fcstValue === "3") weather = "snow"
    else weather = "rainy"
  }

  let bgUrl;

  switch (weather) {    // 날씨에 따라서 배경의 이미지를 바꿈
    case "normal":
      bgUrl = "img/normal.png";
      break;
    case "rainy":
      bgUrl = "img/rainy.jpg";
      break;
    case "snow":
      bgUrl = "img/snow.jpg";
      break;
    default:
      break;
  }

  return (
    <>
      <AppSetting />
      <div className='container' style={bgToggle ? { backgroundImage: `url(${bgUrl})` } : undefined} >  {/* 배경 switch버튼에 따라서 배경의 유무를 설정 */}
        <Header weather={weather} isRainy={isRainy} />
        <main>
          <TodayWeather />
          <NextWeather />
        </main>
        <Footer weather={weather} />
      </div>
    </>
  );
}

export default App;
