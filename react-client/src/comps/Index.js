import Nav from "../page/Nav";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { getUserData } from "../service/user.service";
import { useEffect, useRef } from "react";

const Index = () => {
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
    {
      let sidebar = sideRef.current;
      let blocker = blockRef.current;
      if (sidebar.className === "Sidebar") {
        sidebar.className = "Sidebar active";
        blocker.className = "blocker active";
      } else {
        sidebar.className = "Sidebar";
        blocker.className = "blocker";
      }
    }
  };

  return (
    <>
      <Nav />
      <main className="Index">
        <Outlet />
        <Sidebar ref={sideRef} blocker={blockRef} />
      </main>
      <button className="side-btn" onClick={showSidebar}>
        메뉴 버튼
      </button>
      <div className="blocker" ref={blockRef} onClick={showSidebar}></div>
    </>
  );
};

export default Index;
