import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

// import required modules
import { FreeMode, Scrollbar } from "swiper";
import WeatherBox from "./WeatherBox";
import DateInfo from "../../../Store/DateInfo";

export default function Slider() {
  const today = new Date();   // 금일 날짜
  const now = today.getHours();
  const todayDate = DateInfo(today);

  let changeDate= new Date(today.setDate(today.getDate() + 1)); // 내일 날짜
  let nextDate = DateInfo(changeDate);

  let arr = [];   // 시간을 저장하는 배열
  let day = [];   // 시간에 해당하는 날짜를 저장하는 배열

  for(let i=now;i<now+16;i++) { // 현재 시간에서 16시간 이후까지 표시함
    if (i<24) {  
      arr.push(i);
      day.push(todayDate);    
    }
    else {    // 24시 이후라면 0부터 시작
      arr.push(i-24);
      day.push(nextDate);
    }
  }
  const weatherBoxes = arr.map((aa,index) => {    // 시간과 해당하는 날짜를 props로 전달
    return <SwiperSlide key={index}><WeatherBox time={aa} date={day[index]}/></SwiperSlide>
  })

  return (
    <>
      <Swiper
        slidesPerView={4.5}
        spaceBetween={0}
        freeMode={true}
        scrollbar={
          {hide:true,
            dragSize:'50px'
          }
        }
        modules={[FreeMode, Scrollbar]}
        className="mySwiper"
      >
        {weatherBoxes}
      </Swiper>
    </>
  );
}
