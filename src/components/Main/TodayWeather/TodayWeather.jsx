import React from 'react';
import classes from './TodayWeather.module.css'
import More from './More/More';
import Slider from './WeatherBox/Slider';

export default function TodayWeather() {
  return (
    <div className={classes.TodayWeather}>
      <div className={classes.BoxWraped}>
        <Slider/>
      </div>
      <More/>
    </div>
  )
}
