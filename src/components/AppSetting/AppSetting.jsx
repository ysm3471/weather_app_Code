import React, { useContext, useState } from 'react';
import Modal from '../Modal/Modal';
import classes from './AppSetting.module.css';
import Main from './Main/Main';
import Header from './Header/Header';
import { WeatherContext } from '../Store/WeatherProvider';
import { motion, AnimatePresence } from "framer-motion"
import KaKaoMap from './KaKaoMap/KaKaoMap';
// AnimatePresence 사용 시 컴포넌트가 사라질 때에도 애니메이션을 적용할 수 있음

export default function AppSetting() {
  const { settingToggle } = useContext(WeatherContext);
  const [mapToggle, setMapToggle] = useState(false);    // 맵 스위치
  const [editing, userEditing] = useState(false);   // 편집 중임을 표시하는 state

  function mapToggleBtn() {
    setMapToggle(show => !show)
  }

  return (
    <>
      <Modal>
        <AnimatePresence>
          {settingToggle && <motion.div
            initial={{ x: "-100%" }}    // 시작지점
            animate={{ x: "0%" }}   // 도착지점
            exit={{ x: "-100%" }}   // 사라질 때
            transition={{ duration: 0.3 }}
            className={classes.AppSetting}
            key={"setting"}
          >
            <Header />
            <Main mapToggleBtn={mapToggleBtn} editing={editing} userEditing={userEditing} />
          </motion.div>}
          {/* framer-motion 사용 */}
          {mapToggle && <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.2 }}
            key={"kakao"}
            className={classes.mapWrap}
          >
          <KaKaoMap mapToggleBtn={mapToggleBtn} userEditing={userEditing}/>
          </motion.div>}
        </AnimatePresence>

      </Modal>
    </>
  )
}
