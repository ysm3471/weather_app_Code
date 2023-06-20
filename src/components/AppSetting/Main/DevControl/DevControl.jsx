import React, { useContext, useEffect, useState } from 'react';
import Title from '../UI/Title';
import classes from './DevControl.module.css'
import { WeatherContext } from '../../../Store/WeatherProvider';

export default function DevControl() {
  const {changeWeather,setChangeWeather,rain,setRain,info,setInfo} = useContext(WeatherContext)
  const [num,setNum] = useState(1);

  useEffect(() => {
    switch(changeWeather) {
      case "normal":
        if (num < 4) {
          let copy = [...rain[num]]
          
          for(let key in copy) {
            copy[key].fcstValue = "0"
          }
          setRain({...rain,[num]:copy})
          setNum(num => num + 1)          
        }
        break;
      case "rainy":
        if (num < 4) {
          let copy = [...rain[num]]
          let copy2 = [...info[num]]

          for(let key in copy2) {
            if(copy2[key].category === "PTY") {
              copy2[key].fcstValue = "1"
            }
          }
          for(let key in copy) {
            copy[key].fcstValue = "100"
          }

          setRain({...rain,[num]:copy})
          setInfo({...info,[num]:copy2})
          setNum(num => num + 1)          
        }
        break;
      case "snow":
        if (num < 4) {
          let copy = [...rain[num]]
          let copy2 = [...info[num]]

          for(let key in copy2) {
            if(copy2[key].category === "PTY") {
              copy2[key].fcstValue = "3"
            }
          }
          for(let key in copy) {
            copy[key].fcstValue = "100"
          }
          
          setRain({...rain,[num]:copy})
          setInfo({...info,[num]:copy2})
          setNum(num => num + 1)          
        }
        break;
      default:
        break;
    }
  },[changeWeather,num])


  return (
    <div> 
      <Title title={"개발자 설정"}/>
      <div className={classes.DevControl}>
        <p>표시할 상태</p>
        <select defaultValue={changeWeather} 
        onChange={(e) => {
          setNum(1);
          setChangeWeather(e.target.value)
          }}>
          <option value="default">기본</option>
          <option value="normal">맑음</option>
          <option value="rainy">비</option>
          <option value="snow">눈</option>
        </select>
      </div>
    </div>
  )
}
