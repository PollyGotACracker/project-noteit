import style from "./signInLayout.module.css";
import { Suspense, useLayoutEffect, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { BsThreeDotsVertical } from "react-icons/bs";
import useUserStatus from "@hooks/useUserStatus";
import { overlayState, toggleSidebarSelector } from "@recoils/layout";
import { isSignedInState } from "@recoils/user";
import SignInNav from "@components/navigation/SignInNav";
import Sidebar from "@components/sidebar/Sidebar";
import Fallback from "@components/fallback/Fallback";
import HomeLink from "@components/homeLink/HomeLink";
import Overlay from "@components/overlay/Overlay";

export default function SignInLayout({ isNotFound = false, children }) {
  const navigate = useNavigate();

  const { initial, setUserTokenFlag } = useUserStatus();
  const isSignedIn = useRecoilValue(isSignedInState);
  const isOverlayed = useRecoilValue(overlayState);
  const handleToggleSidebar = useSetRecoilState(toggleSidebarSelector);

  useEffect(() => {
    setUserTokenFlag(true);
  }, [children]);

  useLayoutEffect(() => {
    if (!initial && !isSignedIn) navigate("/", { replace: true });
  }, [initial, isSignedIn]);

  if (!isSignedIn) return <></>;
  return (
    <div className={style.page}>
      <header className={style.header_signin}>
        <HomeLink isNotFound={isNotFound} />
        <button
          className={style.open_sidebar}
          onClick={handleToggleSidebar}
          type="button"
        >
          <BsThreeDotsVertical />
        </button>
      </header>
      <SignInNav />
      <Sidebar />
      <div className={style.background}></div>
      <Suspense fallback={<Fallback />}>{children}</Suspense>
      <Overlay isActive={isOverlayed} isSidebar={true} />
    </div>
  );
}
