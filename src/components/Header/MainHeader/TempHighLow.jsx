import React, { useContext } from 'react';
import classes from './TempHighLow.module.css';
import { WeatherContext } from '../../Store/WeatherProvider';

export default function TempHighLow({weather}) {
  const {TMX,TMN} = useContext(WeatherContext)

  return (
    <div className={classes.TempHighLow}>
      <p className={weather === 'snow' ? classes.snow:undefined}>최고:{TMX[1]}°  최저:{TMN[1]}°</p> 
    </div>
  )
}
