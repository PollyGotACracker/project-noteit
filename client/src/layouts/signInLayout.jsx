import "@styles/signInLayout.css";
import { Suspense, useEffect } from "react";
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

const SignInLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { initial, setUserTokenFlag } = useUserStatus();
  const isSignedIn = useRecoilValue(isSignedInState);
  const openSidebar = useSetRecoilState(sidebarSelector);
  const [overlayClass, resetUI] = useRecoilState(layoutSelector);

  useEffect(() => {
    setUserTokenFlag(true);
  }, [children]);

  useEffect(() => {
    if (!initial && !isSignedIn) navigate("/", { replace: true });
  }, [initial, isSignedIn]);

  useEffect(() => {
    resetUI();
    window.addEventListener("resize", resetUI);
    return () => window.removeEventListener("resize", resetUI);
  }, [location.key]);

  if (!isSignedIn) return <></>;
  return (
    <>
      <header className="header-signin">
        <HomeLink />
        <button className="sidebar-btn" onClick={openSidebar} type="button">
          <BsThreeDotsVertical />
        </button>
      </header>
      <SignInNav />
      <Sidebar />
      <Suspense fallback={<Fallback />}>{children}</Suspense>
      <div className={`overlay${overlayClass}`} onClick={resetUI}></div>
    </>
  );
};

export default SignInLayout;
