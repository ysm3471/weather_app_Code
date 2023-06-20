import React, { useContext, useEffect, useRef } from 'react';
import classes from './Local.module.css';
import { WeatherContext } from '../../Store/WeatherProvider';

export default function Local({ weather }) {
  const { bgToggle, settingToggleBtn, userAddressList } = useContext(WeatherContext)
  let localName = useRef("서울특별시, 중구");   // 기본 지역

  useEffect(() => {
    const selectedAddress = userAddressList.find((aa) => aa.selected)   // 북마크한 주소정보를 검색
    localName.current = selectedAddress.address.replace(/[0-9]/g, "")    // 주소에서 숫자 제거
    localName.current = localName.current.replace(/-/g, "")    // 주소에서 "-" 제거   
  }, [userAddressList])

  let local;

  if (weather === 'snow' || !bgToggle) {    // 배경을 끈 상태거나 weather가 snow일 경우의 style
    local = (
      <div className={`${classes.Local} ${classes.snow}`}>
        <div className={`icon ${classes.gps}`}>
          <img src="img/gps_b.png" alt="gps_b" />
        </div>
        <p>{localName.current}</p>
        <div className={`icon ${classes.edit}`} onClick={settingToggleBtn}>
          <img src="img/edit_b.png" alt="edit_b" />
        </div>
      </div>
    )
  }
  else {
    local = (
      <div className={classes.Local}>
        <div className={`icon ${classes.gps}`}>
          <img src="img/gps_w.png" alt="gps_w" />
        </div>
        <p>{localName.current}</p>
        <div className={`icon ${classes.edit}`} onClick={settingToggleBtn}>
          <img src="img/edit_w.png" alt="edit_w" />
        </div>
      </div>
    )
  }

  return (
    <>
      {local}
    </>
  )
}
