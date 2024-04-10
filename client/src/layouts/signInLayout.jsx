import "@styles/signInLayout.css";
import { Suspense, useLayoutEffect, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { BsThreeDotsVertical } from "react-icons/bs";
import useUserStatus from "@hooks/useUserStatus";
import { sidebarSelector, layoutSelector } from "@recoils/global";
import { isSignedInState } from "@recoils/user";
import SignInNav from "@components/signInNav";
import Sidebar from "@components/sidebar";
import Fallback from "@components/fallback";
import HomeLink from "@components/homeLink";

const SignInLayout = ({ isNotFound = false, children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const prevWindowWidth = useRef(window.innerWidth);
  const { initial, setUserTokenFlag } = useUserStatus();
  const isSignedIn = useRecoilValue(isSignedInState);
  const toggleSidebar = useSetRecoilState(sidebarSelector);
  const [overlayClass, resetUI] = useRecoilState(layoutSelector);

  const resetSidebar = () => {
    if (prevWindowWidth.current === window.innerWidth) return;
    else {
      resetUI();
      prevWindowWidth.current = window.innerWidth;
    }
  };

  useEffect(() => {
    setUserTokenFlag(true);
  }, [children]);

  useLayoutEffect(() => {
    if (!initial && !isSignedIn) navigate("/", { replace: true });
  }, [initial, isSignedIn]);

  useEffect(() => {
    resetUI();
    return () => resetUI();
  }, [location.key]);

  useEffect(() => {
    window.addEventListener("resize", resetSidebar);
    return () => window.removeEventListener("resize", resetSidebar);
  }, [prevWindowWidth.current]);

  if (!isSignedIn) return <></>;
  return (
    <div id="page">
      <header className="header-signin">
        <HomeLink isNotFound={isNotFound} />
        <button className="sidebar-btn" onClick={toggleSidebar} type="button">
          <BsThreeDotsVertical />
        </button>
      </header>
      <SignInNav />
      <Sidebar />
      <div className="background"></div>
      <Suspense fallback={<Fallback />}>{children}</Suspense>
      <div className={`overlay${overlayClass}`} onClick={resetUI}></div>
    </div>
  );
};

export default SignInLayout;
