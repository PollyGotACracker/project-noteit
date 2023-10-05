import "@styles/signInLayout.css";
import { Suspense, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { BsThreeDotsVertical } from "react-icons/bs";
import { sidebarSelector, layoutSelector } from "@recoils/global";
import SignInNav from "@components/signInNav";
import Sidebar from "@components/sidebar";
import Fallback from "@components/fallback";

const SignInLayout = () => {
  const openSidebar = useSetRecoilState(sidebarSelector);
  const resetUI = useSetRecoilState(layoutSelector);
  const location = useLocation();

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
      <Suspense fallback={<Fallback />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default SignInLayout;
