import "@styles/components/themeToggle.css";
import { useRecoilState } from "recoil";
import { RiSunLine, RiMoonLine } from "react-icons/ri";
import { themeState } from "@recoils/theme";
import { setThemeStorage } from "@utils/manageThemeStorage";

const ThemeToggle = () => {
  const [userTheme, setUserTheme] = useRecoilState(themeState);

  const changeThemeHandler = ({ target: { checked } }) => {
    setUserTheme(checked);
    setThemeStorage(checked);
  };

  return (
    <section className="theme-box">
      <label htmlFor="darkmode" className="darkmode-toggle">
        <span className="dark" style={{ visibility: !userTheme && "hidden" }}>
          <RiMoonLine />
        </span>
        <input
          type="checkbox"
          id="darkmode"
          hidden
          checked={userTheme}
          onChange={changeThemeHandler}
        />
        <span className="darkmode-btn"></span>
        <span className="light" style={{ visibility: userTheme && "hidden" }}>
          <RiSunLine />
        </span>
      </label>
    </section>
  );
};

export default ThemeToggle;
