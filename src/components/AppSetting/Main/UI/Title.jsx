import React from 'react';
import classes from './Title.module.css'

export default function Title({title}) {
  return (
    <div className={classes.Title}>{title}</div>
  )
}
