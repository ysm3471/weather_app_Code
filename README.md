IsRainy
========
#### 오늘의 강수 정보를 보는 것에 특화된 웹&앱 형식의 사이트입니다. figma를 사용하여 디자인하였습니다
*제작기간 5.17 ~ 6.18*

##### 사용 기술 : React
##### 사용 라이브러리 및 api : Swiper, Mui, framer-motion, Kakao map, 기상청 api
<br><br>
> 주요 코드 1
> * 기상청 api를 state 변수에 저장하는 코드. 요청에 시간이 걸리기 때문에 페이지 로드 시에 한 번만 요청한다.<br>정보의 양이 많아 3페이지까지 있기 때문에 3번 요청할 필요가 있었다
<pre>
  <code>
    useEffect(() => {
    setOn(false)    // api의 호출 완료를 표시하는 state
    GetInfo(todayDate, number,convertLoaction.x,convertLoaction.y)    // api를 요청하는 함수. 오늘 날짜와 페이지넘버, 가공된 x,y좌표를 변수로 받음
      .then(res => {
        if (number < 4) {   // 3페이지까지 저장
          setInfo({ ...info, [number]: res.response.body.items.item });
          setState({ ...info, [number]: res.response.header });
          setNumber(num => num + 1)
        }
        else {    // 3페이지까지 저장했다면 준비완료
          setOn(true);
        }
      })
      .catch(error => {
        setNumber(1);
        console.log(error,"에러가 발생했습니다")})
  }, [number])
  </code>  
</pre> 
<br><br>
> 주요 코드 2
> * 요청한 정보를 가공하는 코드. state에 저장한 정보를 가공하기 때문에 재요청하지 않는다.
<pre>
  <code>
    useEffect(() => {
    getReady(false)  // api 처리의 완료를 표시하는 state
    if (on) {
      let TMNres = info[page].find((aa) => { return aa.fcstDate === date.current && aa.category === "TMN" })    // 각 날짜의 최저온도를 저장
      let TMXres = info[page].find((aa) => { return aa.fcstDate === date.current && aa.category === "TMX" })    // 각 날짜의 최저온도를 저장
      let rainres = info[page].filter((aa) => { return aa.fcstDate === date.current && aa.category === "POP" })   // 각 페이지의 강수확률을 배열로 저장

      if (rainres[rainres.length - 1].fcstTime === "2300") {    // 찾은 결과의 마지막요소가 fcstTime이 23시일경우
        for (let key in rainres) {    // 임시 저장소에 병합 후 저장함
          rainList.current.push(rainres[key])
        }
        setRain({ ...rain, [num]: rainList.current })
        rainList.current = [];    // 임시 저장소 초기화
      }
      else {    // 23시가 아닐경우
        for (let key in rainres) {
          rainList.current.push(rainres[key])   // 임시저장소에 저장함
        }
      }


      switch (false) {    // 왜인지는 모르겠는데 그냥 배열을 괄호 안에 넣으면 true로 인식하지 않음. 그래서 !연산자를 사용해 불리언 값으로 만든 다음에 스위치문을 돌림
        case (!(TMXres) || !(TMNres)):   // TMX와 TMN을 전부 찾았을 경우 저장함
          setTMN({ ...TMN, [num]: TMNres.fcstValue })   
          setTMX({ ...TMX, [num]: TMXres.fcstValue })
          if (num < 3) {    // 3회 반복을 위한 조건문
            changeDate.current = new Date(changeDate.current.setDate(changeDate.current.getDate() + 1));    // 저장할 때 마다 날짜를 1 증가시킴
            date.current = DateInfo(changeDate.current);
            setNum(num => num + 1)
          }
          else {
            getReady(true)    // num이 3일 경우 렌더링을 시작함
          }
          break;
        case (!(TMNres)):   // TMN만 찾았을 경우
          setTMN({ ...TMN, [num]: TMNres.fcstValue });
          setPage(num => num + 1);    // page만 넘김
          break;
        case (!(TMXres)):   // TMX만 찾았을 경우
          setTMN({ ...TMX, [num]: TMXres.fcstValue })
          setPage(num => num + 1)
          break;
        default:    // 아무것도 못 찾았을 경우
          if (page < 3) {
            setPage(num => num + 1);
          }
          break;
      }
    }
  }, [num, page, on])
  </code>
</pre>
<br><br>
> 주요 코드 3
> * 개발자 모드. 날씨 상태에 따른 앱 변화를 보기 위해서 만들었다.<br>가공한 api의 state를 수정하는 방식으로 만들어봤다.
<pre>
  <code>
  useEffect(() => {
    switch(changeWeather) {
      case "normal":    // 맑음 상태는 강수확률을 0으로 만든다
        if (num < 4) {
          let copy = [...rain[num]]
          
          for(let key in copy) {
            copy[key].fcstValue = "0"
          }
          setRain({...rain,[num]:copy})
          setNum(num => num + 1)          
        }
        break;
      case "rainy":    // 비 상태는 모든 시간대의 강수확률을 100으로 만들고 PTY값(강수형태)을 1로 바꾼다
        if (num < 4) {
          let copy = [...rain[num]]
          let copy2 = [...info[num]]

          for(let key in copy2) {
            if(copy2[key].category === "PTY") {
              copy2[key].fcstValue = "1"
            }
          }
          for(let key in copy) {
            copy[key].fcstValue = "100"
          }

          setRain({...rain,[num]:copy})
          setInfo({...info,[num]:copy2})
          setNum(num => num + 1)          
        }
        break;
      case "snow":  // 눈 상태는 모든 시간대의 강수확률을 100으로 만들고 PTY값(강수형태)을 3으로 바꾼다
        if (num < 4) {
          let copy = [...rain[num]]
          let copy2 = [...info[num]]

          for(let key in copy2) {
            if(copy2[key].category === "PTY") {
              copy2[key].fcstValue = "3"
            }
          }
          for(let key in copy) {
            copy[key].fcstValue = "100"
          }
          
          setRain({...rain,[num]:copy})
          setInfo({...info,[num]:copy2})
          setNum(num => num + 1)          
        }
        break;
      default:
        break;
    }
  },[changeWeather,num])
  </code>
</pre>
<br><br>
>느낀 점
> * 처음으로 React로 작업한 프로젝트이다. 폴더관리나 기초적인 hook 사용법 등등 모르는 것이 많아 다양한 블로그 글을 참고했다. 가장 어려웠던 것은 원하지 않는 re-rendering 문제였는데, 너무 많은 rendering을 일으킬 수 있는 작업은 context에서 처리한 뒤 배포하는 방식으로 해결하였다.
> * 이후에 typescript로 refactoring도 진행해보았다. 폴더와 변수 관리를 잘 해놓았기 때문에 큰 문제없이 진행되었다.(링크:[TypeScript-code](https://github.com/ysm3471/weather-ts "TypeScript"))
