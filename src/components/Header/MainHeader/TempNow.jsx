import React, { useContext } from 'react';
import classes from './TempNow.module.css';
import { WeatherContext } from '../../Store/WeatherProvider';

export default function TempNow() {
  const {info} = useContext(WeatherContext);

  const today = new Date();
  let now = today.getHours();

  if(now <10) {   // 현재 시간을 형식에 맞게 변경
    now = "0" + now + "00"
  }
  else {
    now = now + "00"
  }

  const tempNow = info[1].find((aa) => {    // 현재 시간의 기온을 검색
    return aa.category === "TMP" && aa.fcstTime === now
  })

  return (
    <div className={classes.TempNow}>
      <p>{tempNow.fcstValue}°</p>
    </div>
  )
}
