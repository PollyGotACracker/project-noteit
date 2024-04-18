import style from "./sidebar.module.css";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import cx from "classnames";
import { closeSidebarSelector, toggleSidebarSelector } from "@recoils/layout";
import Clock from "./Clock";
import UserProfile from "./UserProfile";
import AudioPlayer from "./AudioPlayer";
import Search from "./Search";
import DarkMode from "./DarkMode";
import SignInNav from "@components/navigation/SignInNav";

export default function Sidebar() {
  const location = useLocation();

  const prevWindowWidth = useRef(window.innerWidth);
  const checkIsMobileWidth = () => window.innerWidth <= 1023;
  const [isMobileSize, setIsMobileSize] = useState(checkIsMobileWidth);
  const [isActive, handleToggleSidebar] = useRecoilState(toggleSidebarSelector);
  const closeSidebar = useSetRecoilState(closeSidebarSelector);

  const changeIsMobileSize = () => setIsMobileSize(checkIsMobileWidth);
  const onWindowResize = () => {
    if (prevWindowWidth.current === window.innerWidth) return;
    else {
      closeSidebar();
      changeIsMobileSize();
      prevWindowWidth.current = window.innerWidth;
    }
  };

  useEffect(() => {
    window.addEventListener("resize", onWindowResize);
    return () => window.removeEventListener("resize", onWindowResize);
  }, [prevWindowWidth.current]);

  useEffect(() => {
    closeSidebar();
    return () => closeSidebar();
  }, [location.key]);

  return (
    <aside className={cx([style.sidebar, { [style.active]: isActive }])}>
      <section className={style.close_box}>
        <button
          type="button"
          className={style.close}
          onClick={handleToggleSidebar}
        >
          <RxCross2 />
        </button>
      </section>
      <Clock />
      <AudioPlayer />
      <Search />
      <DarkMode />
      <UserProfile />
      {isMobileSize && <SignInNav isSidebar={true} />}
    </aside>
  );
}
