import React, { useContext } from 'react';
import classes from './Header.module.css'
import { WeatherContext } from '../../Store/WeatherProvider';

export default function Header() {
  const {settingToggleBtn} = useContext(WeatherContext)

  return (
    <header className={classes.Header}>
      <div className="icon" onClick={settingToggleBtn}>
        <img src="img/prev.png" alt="prev" />
      </div>
      <h1>환경설정</h1>
    </header>
  )
}
