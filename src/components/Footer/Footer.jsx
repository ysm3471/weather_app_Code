import React from 'react';
import classes from './Footer.module.css'
import { useContext } from 'react';
import { WeatherContext } from '../Store/WeatherProvider';

export default function Footer({weather}) {
  const {settingToggleBtn} = useContext(WeatherContext);

  return (
    <footer className={classes.Footer}>
      <div className={`icon ${classes.icon}`} onClick={settingToggleBtn}>
        {weather === "rainy" ? <img src="img/setting_w.png" alt="setting" /> : <img src="img/setting_b.png" alt="setting" />}
      </div>
    </footer>
  )
}
