import React from 'react';
import Time from './Time';
import Local from './Local';
import classes from './TopHeader.module.css'

export default function TopHeader({weather}) {
  return (
    <div className={classes.TopHeader}>
      <Time weather={weather}/>
      <Local weather={weather}/>
    </div>
  )
}
