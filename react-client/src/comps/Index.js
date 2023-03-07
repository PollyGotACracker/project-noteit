import Nav from "../page/Nav";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { getUserData } from "../service/user.service";
import { useEffect } from "react";

const Index = () => {
  const { userData, setUserData, profileData, setProfileData } =
    useUserContext();

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

  return (
    <>
      <Nav />
      <main className="Index">
        <Outlet />
        <Sidebar />
      </main>
    </>
  );
};

export default Index;
