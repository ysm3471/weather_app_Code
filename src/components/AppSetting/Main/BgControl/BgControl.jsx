import React from 'react';
import Title from '../UI/Title';
import classes from './BgControl.module.css'
import SwitchBtn from './IOSSwitch';

export default function BgControl() {
  return (
      <div>
        <Title title={"배경 설정"}/>
        <div className={classes.BgControl}>
          <p>배경 켜기/끄기</p>
          <div>
            <SwitchBtn/>
          </div>
        </div>
      </div>    
  )
}
