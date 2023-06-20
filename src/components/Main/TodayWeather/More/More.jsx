import React from 'react';
import classes from './More.module.css';

export default function More() {
  const url = "https://m.search.naver.com/search.naver?sm=mtp_hty.top&where=m&query=%EB%82%A0%EC%94%A8"
  return (
    <div className={classes.More}><button onClick={()=>{window.open(url)}}>더보기</button></div>
  )
}
