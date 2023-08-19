import React, { memo } from 'react';
import classes from './Footer.module.css'
import { useContext } from 'react';
import { WeatherContext } from '../Store/WeatherProvider';

function Footer({weather}) {
  const {settingToggleBtn} = useContext(WeatherContext);

  return (
    <footer className={classes.Footer}>
      <div className={`icon ${classes.icon}`} onClick={settingToggleBtn}>
        {weather === "rainy" ? <img src="img/setting_w.png" alt="setting" /> : <img src="img/setting_b.png" alt="setting" />}
      </div>
    </footer>
  )
}

export default memo(Footer);
