import { themeState } from "@/recoils/theme";
import { setThemeStorage } from "@utils/manageThemeStorage";
import { RiSunLine, RiMoonLine } from "react-icons/ri";
import { useRecoilState } from "recoil";

const ThemeToggle = () => {
  const [userTheme, setUserTheme] = useRecoilState(themeState);

  const changeThemeHandler = ({ target: { checked } }) => {
    setUserTheme(checked);
    setThemeStorage(checked);
  };

  return (
    <section className="theme-box">
      <span className="light">
        <RiSunLine />
      </span>
      <input
        type="checkbox"
        id="darkmode"
        hidden
        checked={userTheme}
        onChange={changeThemeHandler}
      />
      <label htmlFor="darkmode" className="darkmode-toggle">
        <span className="darkmode-btn"></span>
      </label>
      <span className="dark">
        <RiMoonLine />
      </span>
    </section>
  );
};

export default ThemeToggle;
