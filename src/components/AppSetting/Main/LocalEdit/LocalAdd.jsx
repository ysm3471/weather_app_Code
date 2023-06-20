import React from 'react';
import classes from './LocalAdd.module.css';

export default function LocalAdd({mapToggleBtn}) {
  return (
    <div className={classes.LocalAdd}>
      <div className="icon" onClick={mapToggleBtn}>
        <img src="img/add.png" alt="add" />
      </div>
    </div>
  )
}
