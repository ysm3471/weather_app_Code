import React, { useContext } from 'react';
import classes from './Header.module.css'
import TopHeader from './TopHeader/TopHeader';
import MainHeader from './MainHeader/MainHeader';
import { WeatherContext } from '../Store/WeatherProvider';

export default function Header({weather,isRainy}) {
  const {bgToggle} = useContext(WeatherContext)

  return (
    <header className={classes.Header} style={bgToggle ? undefined : {color:'var(--deep_b)'}}>
      <TopHeader weather={weather}/>
      <MainHeader weather={weather} isRainy={isRainy}/>
    </header>
  )
}
