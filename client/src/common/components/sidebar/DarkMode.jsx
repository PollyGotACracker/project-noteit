import style from "./darkMode.module.css";
import { useRecoilState } from "recoil";
import { RiSunLine, RiMoonLine } from "react-icons/ri";
import { themeState } from "@recoils/theme";
import { setThemeStorage } from "@utils/manageThemeStorage";

export default function DarkMode() {
  const [userTheme, setUserTheme] = useRecoilState(themeState);

  const handleChangeTheme = ({ target: { checked } }) => {
    setUserTheme(checked);
    setThemeStorage(checked);
  };

  return (
    <section className={style.theme}>
      <label htmlFor={style.darkmode} className={style.switch}>
        <span
          className={style.dark}
          style={{ visibility: !userTheme && "hidden" }}
        >
          <RiMoonLine />
        </span>
        <input
          id={style.darkmode}
          checked={userTheme}
          onChange={handleChangeTheme}
          type="checkbox"
          hidden
        />
        <span className={style.slider} />
        <span
          className={style.light}
          style={{ visibility: userTheme && "hidden" }}
        >
          <RiSunLine />
        </span>
      </label>
    </section>
  );
}
