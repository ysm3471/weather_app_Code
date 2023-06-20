import React from 'react';
import classes from './MainHeader.module.css';
import RainCheck from './RainCheck';
import TempNow from './TempNow';
import TempHighLow from './TempHighLow';

export default function MainHeader({weather,isRainy}) {
  return (
    <div className={classes.MainHeader}>
      <TempNow/>
      <RainCheck weather={weather} isRainy={isRainy}/>
      <TempHighLow weather={weather}/>
    </div>
  )
}
