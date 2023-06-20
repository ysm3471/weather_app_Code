import React from 'react';
import classes from './Icon.module.css'

export default function Icon({weather}) {
  let icon = "img/no_rain.png";

  switch (weather) {
    case "normal":
      icon = "img/no_rain.png";
      break;
    case "rainy":
      icon = "img/rain.png";
      break;
    case "snow":
      icon = "img/snow.png";
      break;
    default:
      break;
  }

  return (
    <div className={`icon ${classes.Icon}`}>
      <img src={icon} alt="" />
    </div>
  )
}
