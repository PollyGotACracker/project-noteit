import { useEffect } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import "./css/App.css";
import { useUserContext } from "./context/UserContext";

export const getUserColorTheme = () => {
  /**
   * cf)
   * 사용자 선호 테마
   * window.matchMedia("(prefers-color-scheme: dark)").matches  ==> true or false
   */
  const userColorTheme = localStorage?.getItem("color-theme");
  const osColorTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  // 사용자 지정 테마가 없을 경우(null) 사용자 선호 테마로 설정
  const value = userColorTheme || osColorTheme;
  // 설정에서 checkbox checked 값
  const bool = value === "dark" ? true : false;
  localStorage.setItem("color-theme", value);
  document.documentElement.setAttribute("color-theme", value);

  return bool;
};

const App = () => {
  const bool = useLoaderData();
  const { setColorTheme } = useUserContext();
  useEffect(() => {
    setColorTheme(bool);
  }, []);

  return (
    <div className="App">
      <Outlet />
    </div>
  );
};

export default App;
