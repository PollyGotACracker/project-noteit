import "@styles/signInLayout.css";
import { Suspense, useEffect, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useQuery } from "react-query";
import { Link, Outlet, useLocation } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { queryEnabledState, userState } from "@recoils/user";
import { getUserInfo } from "@services/user.service";
import SignInNav from "@components/signInNav";
import Sidebar from "@components/sidebar";
import Fallback from "@components/fallback";

const SignInLayout = () => {
  const location = useLocation();
  const sideRef = useRef(null);
  const blockRef = useRef(null);

  const setUserData = useSetRecoilState(userState);
  const [queryEnabled, setQueryEnabled] = useRecoilState(queryEnabledState);
  useQuery(
    getUserInfo({
      enabled: queryEnabled,
      onSuccess: (data) => {
        setUserData({ ...data });
      },
    })
  );

  useEffect(() => {
    if (queryEnabled) {
      setQueryEnabled(false);
    }
  }, [queryEnabled]);

  const toggleSidebar = () => {
    sideRef.current.classList.toggle("active");
    blockRef.current.classList.toggle("active");
  };

  useEffect(() => {
    const closeSidebar = () => {
      sideRef.current.classList.remove("active");
      blockRef.current.classList.remove("active");
    };
    closeSidebar();
    window.addEventListener("resize", closeSidebar);
    return () => window.removeEventListener("resize", closeSidebar);
  }, [location.key]);

  return (
    <>
      <header className="header-signin">
        <Link className="title" to={"/"}>
          NoteIT
        </Link>
        <button className="sidebar-btn" onClick={toggleSidebar} type="button">
          <BsThreeDotsVertical />
        </button>
      </header>
      <SignInNav />

      <Sidebar ref={sideRef} />
      <Suspense fallback={<Fallback />}>
        <Outlet />
      </Suspense>
      <div className="blocker" ref={blockRef} onClick={toggleSidebar}></div>
    </>
  );
};

export default SignInLayout;