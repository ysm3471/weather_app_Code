import React, { memo } from 'react';
import classes from './TodayWeather.module.css'
import More from './More/More';
import Slider from './WeatherBox/Slider';

function TodayWeather() {

  console.log('todayWeather')
  return (
    <div className={classes.TodayWeather}>
      <div className={classes.BoxWraped}>
        <Slider/>
      </div>
      <More/>
    </div>
  )
}

export default memo(TodayWeather)


