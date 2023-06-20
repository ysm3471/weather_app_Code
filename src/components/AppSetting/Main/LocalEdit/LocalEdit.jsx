import React, { useContext, useEffect, useState } from 'react'
import Title from '../UI/Title'
import LocalAdd from './LocalAdd'
import classes from './LocalEdit.module.css'
import { WeatherContext } from '../../../Store/WeatherProvider'

export default function LocalEdit({ mapToggleBtn, userEditing,editing }) {
  const { userAddress,userAddressList, setUserAddressList,userLocation } = useContext(WeatherContext);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const today = new Date();
    const id = today.getTime();   // 시간정보로 아이디 값을 생성

    const check = userAddressList.find((aa) => userAddress === aa.address )   // 중복인지 체크
    if (!(check) && userAddress) {    // 중복이 아니고 초기상태도 아니라면
      if (editing) {  // 편집 중일 경우
        const search = userAddressList.find((aa) => aa.id === editingId);   // 편집 중인 요소를 검색
        let copy = [...userAddressList];    // 아마 참조복사가 되는듯. 생각한 결과는 아니지만 문제는 없음
        copy.forEach((aa) => {
          if(aa.id === search.id) {
            aa.Ma = userLocation.Ma;
            aa.La = userLocation.La;
            aa.address = userAddress ; // 편집 중인 요소의 주소와 좌표 정보를 변경
          }
        })
        setUserAddressList(copy);   // 편집한 요소가 있는 배열을 기존 배열에 덮어씌움
        userEditing(false);   // 편집 종료
        }
      else {   // 편집 중이 아닐 경우
        const newList = {   // 선택한 주소의 정보를 담는 객체를 생성
          id,
          address: userAddress,
          selected:false,
          Ma:userLocation.Ma,
          La:userLocation.La
        }
        let copy = [...userAddressList];
        copy = copy.concat(newList);    // 생성한 객체를 기존에 배열에 합침
        setUserAddressList(copy);
      }
    }
  }, [userAddress])

  const localList = (
    <div>
      {userAddressList.map((item, index) => 
      {localStorage.setItem('watched', JSON.stringify(userAddressList));    // 리스트를 생성할 때마다 로컬스토리지에 저장함
      return (
        <div className={classes.LocalList} key={index}>
          <div className={classes.local}>
            <p>{item.address}</p>
            <div className="icon" onClick={() => {    // 누르면 북마크를 초기화하고 선택한 리스트의 북마크를 표시
              let copy = [...userAddressList];
              copy.forEach((aa) => aa.selected = false)
              copy[index].selected = true
              setUserAddressList(copy)
            }}>
              {item.selected ? <img src="img/Star-checked.png" alt="star-checked" /> : <img src="img/Star-default.png" alt="star-unchecked" />}
            </div>
          </div>
          <div className={classes.icons}>
            <div className={`icon ${classes.edit}`} onClick={() => { editBtn(item.id) }}>
              <img src="img/edit_b.png" alt="edit_b" />
            </div>
            <div className={`icon ${classes.trash}`} onClick={() => { removeBtn(item.id) }}>
              <img src="img/trash.png" alt="trash" />
            </div>
          </div>
        </div>
      )})}
    </div>
  )
  function editBtn(key) {   // 편집 버튼을 누르면 맵을 켜고 편집하려는 요소의 id를 저장함
    mapToggleBtn();
    userEditing(true);
    setEditingId(key);
  }
  function removeBtn(key) {   // 삭제 버튼을 누르면 선택한 id를 userAddressList에서 검색해서 삭제
    const searchList = userAddressList.find((aa) => aa.id === key )
    if(searchList.selected) alert("북마크한 목록은 삭제할 수 없습니다.") 
    else setUserAddressList(userAddressList.filter((aa) => aa.id !== key)) 
  }
  return (
    <div>
      <Title title={"지역관리"} />
      {localList}
      {(userAddressList.length < 3) && <LocalAdd mapToggleBtn={mapToggleBtn} />} {/* 리스트가 3개 이상이라면 add버튼은 나오지 않음 */}
    </div>
  )
}
