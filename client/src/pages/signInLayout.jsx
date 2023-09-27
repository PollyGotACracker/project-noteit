import "@styles/signInLayout.css";
import { useEffect, useRef } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useUserContext } from "@contexts/userContext";
import { getUserData } from "@services/user.service";
import SignInNav from "@components/signInNav";
import Sidebar from "@components/sidebar";

const SignInLayout = () => {
  const { userData, setUserData, profileData, setProfileData } =
    useUserContext();
  const location = useLocation();
  const sideRef = useRef(null);
  const blockRef = useRef(null);

  useEffect(() => {
    (async () => {
      const result = await getUserData();
      setUserData({
        ...userData,
        ...result,
      });
      setProfileData({
        ...profileData,
        // src(u_profileimg) 의 초기값은 "" 로 둘 것
        str: result.u_profilestr,
      });
    })();
  }, []);

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
      <Outlet />
      <div className="blocker" ref={blockRef} onClick={toggleSidebar}></div>
    </>
  );
};

export default SignInLayout;
