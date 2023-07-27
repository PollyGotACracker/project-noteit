import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./styles/App.css";
import { useUserContext } from "./contexts/UserContext";
import { getThemeStorage, setThemeStorage } from "./utils/manageThemeStorage";

const App = () => {
  const { setColorTheme } = useUserContext();

  useEffect(() => {
    const userTheme = getThemeStorage();
    setThemeStorage(userTheme);
    setColorTheme(userTheme);
  }, []);

  return (
    <div className="App">
      <Outlet />
    </div>
  );
};

export default App;
