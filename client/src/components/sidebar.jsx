import { useState, forwardRef, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "@styles/sidebar.css";
import { GiStarsStack } from "react-icons/gi";
import { RiLogoutBoxLine, RiSunLine, RiMoonLine } from "react-icons/ri";
import profile from "@assets/images/profile.png";
import { useUserContext } from "@contexts/userContext";
import { setThemeStorage } from "@utils/manageThemeStorage";
import getClock from "@utils/getClock";
import UserAvatar from "@components/userAvatar";
import AudioPlayer from "@components/audioPlayer";
import { getSearchResult } from "@/services/search.service";
import { URLS } from "@/router";

// forwardRef: 부모 comp 에서 useRef 를 받아 내부 요소에 사용
// 반드시 props 와 ref 를 인수로 받음
const Sidebar = forwardRef((props, ref) => {
  const { sidebar, blocker } = ref;
  const navigate = useNavigate();
  const [date, setDate] = useState(getClock().date);
  const [time, setTime] = useState(getClock().time);
  const { userData, colorTheme, setColorTheme } = useUserContext();
  const [searchValue, setSearchValue] = useState("");

  const changeClock = () => {
    setDate(getClock().date);
    setTime(getClock().time);
  };

  // setInterval 은 설정한 시간을 보장하지 않기 때문에 setTimeout 재귀함수 사용
  useLayoutEffect(() => {
    const clock = setTimeout(changeClock, setTimeout(changeClock, 1000), 1000);
    return () => {
      clearTimeout(clock);
    };
  }, [date, time]);

  const searchData = async (value) => {
    setSearchValue(value);
    const { data, regexp } = await getSearchResult(value);
    navigate(`${URLS.SEARCH}?value=${value}`, {
      state: { data, regexp, value },
    });
  };

  const searchKeyword = (e) => {
    if (e.keyCode === 13) {
      const chk = searchValue.replaceAll(" ", "");
      if (chk === "") {
        e.preventDefault();
        return false;
      } else {
        searchData(searchValue);
        sidebar.current.className = "Sidebar";
        blocker.current.className = "blocker";
        e.preventDefault();
      }
    }
  };

  const modeChangeHandler = ({ target }) => {
    setThemeStorage(target.checked);
    setColorTheme(target.checked);
  };

  return (
    <aside className="Sidebar" ref={sidebar}>
      <section className="clock">
        <div className="today">{date}</div>
        <div className="today">{time}</div>
      </section>
      <section className="profile">
        <div className="profile-img">
          <UserAvatar
            src={
              userData?.u_profileimg
                ? `/server/uploads/${userData?.u_profileimg}`
                : profile
            }
          />
        </div>
        <div className="nickname">{userData?.u_nickname}</div>
        <div className="profile-str">
          <span>{userData?.u_profilestr}</span>
        </div>
        <div title="점수" className="score">
          <GiStarsStack /> {userData?.u_score}
        </div>
      </section>
      <section className="player">
        <AudioPlayer />
      </section>
      <form>
        <input
          className="search"
          placeholder="검색"
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => searchKeyword(e)}
        />
      </form>
      <section className="theme-box">
        <span className="light">
          <RiSunLine />
        </span>
        <input
          type="checkbox"
          id="darkmode"
          hidden
          checked={colorTheme}
          onChange={(e) => modeChangeHandler(e)}
        />
        <label htmlFor="darkmode" className="darkmode-toggle">
          <span className="darkmode-btn"></span>
        </label>
        <span className="dark">
          <RiMoonLine />
        </span>
      </section>
      <section className="logout">
        <RiLogoutBoxLine />
        <Link to={"/logout"}>로그아웃</Link>
      </section>
    </aside>
  );
});

export default Sidebar;
