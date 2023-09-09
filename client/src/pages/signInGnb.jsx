import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useUserContext } from "@contexts/userContext";
import { getUserData } from "@services/user.service";
import Nav from "@components/nav";
import Sidebar from "@components/sidebar";

const SignInGnb = () => {
  const { userData, setUserData, profileData, setProfileData } =
    useUserContext();
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

  const showSidebar = () => {
    let sidebar = sideRef.current;
    let blocker = blockRef.current;
    if (sidebar.className === "Sidebar") {
      sidebar.className = "Sidebar active";
      blocker.className = "blocker active";
    } else {
      sidebar.className = "Sidebar";
      blocker.className = "blocker";
    }
  };

  return (
    <>
      <Nav />
      <main className="Index">
        <Outlet />
        {/* useRef 전달 */}
        <Sidebar ref={{ sidebar: sideRef, blocker: blockRef }} />
      </main>
      <header className="header">
        <span className="title">NoteIT</span>
        <button className="side-btn" onClick={showSidebar}>
          <BsThreeDotsVertical />
        </button>
      </header>
      <div className="blocker" ref={blockRef} onClick={showSidebar}></div>
    </>
  );
};

export default SignInGnb;