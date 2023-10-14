import "@styles/signInLayout.css";
import { Suspense, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { BsThreeDotsVertical } from "react-icons/bs";
import { sidebarSelector, layoutSelector } from "@recoils/global";
import SignInNav from "@components/signInNav";
import Sidebar from "@components/sidebar";
import Fallback from "@components/fallback";
import useUserStatus from "@hooks/useUserStatus";

const SignInLayout = ({ children }) => {
  const openSidebar = useSetRecoilState(sidebarSelector);
  const [overlayClass, resetUI] = useRecoilState(layoutSelector);
  const location = useLocation();
  useUserStatus();

  useEffect(() => {
    resetUI();
    window.addEventListener("resize", resetUI);
    return () => window.removeEventListener("resize", resetUI);
  }, [location.key]);

  return (
    <>
      <header className="header-signin">
        <Link className="title" to={"/"}>
          NoteIT
        </Link>
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
