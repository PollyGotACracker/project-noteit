import "../styles/Sidebar.css";
import Player from "./Player";
import { useUserContext } from "../contexts/UserContext";
import { GiStarsStack } from "react-icons/gi";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useState, useRef, forwardRef, useLayoutEffect } from "react";
import profile from "../assets/images/profile.png";
import { getToday } from "../data/HomeData";
import { Link, useNavigate } from "react-router-dom";
import { RiSunLine, RiMoonLine } from "react-icons/ri";

// forwardRef: 부모 comp 에서 useRef 를 받아 내부 요소에 사용
// 반드시 props 와 ref 를 인수로 받음
const Sidebar = forwardRef((props, ref) => {
  const { sidebar, blocker } = ref;
  const navigate = useNavigate();
  const [date, setDate] = useState(getToday().date);
  const [time, setTime] = useState(getToday().time);
  const { userData, colorTheme, setColorTheme } = useUserContext();
  const [image, setImage] = useState({ width: "", height: "" });
  const imgSrc = useRef();
  const [searchValue, setSearchValue] = useState("");

  const changeClock = () => {
    setDate(getToday().date);
    setTime(getToday().time);
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
    const fetchOption = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const res = await fetch(
      `/note/search?value=${searchValue}`,
      fetchOption
    ).then((data) => data.json());

    navigate(`/note/search?value=${value}`, {
      state: { data: res.result, regexp: res.regexp, value: value },
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

  const modeChangeHandler = (e) => {
    let theme = "";
    let bool = false;
    if (e.target.checked) {
      theme = "dark";
      bool = true;
    } else {
      theme = "light";
      bool = false;
    }
    localStorage.setItem("color-theme", theme);
    document.documentElement.setAttribute("color-theme", theme);
    setColorTheme(bool);
  };

  return (
    <aside className="Sidebar" ref={sidebar}>
      <section className="clock">
        <div className="today">{date}</div>
        <div className="today">{time}</div>
      </section>
      <section className="profile">
        <div className="profile-img">
          <img
            alt="avatar"
            src={
              userData?.u_profileimg
                ? `/uploads/${userData?.u_profileimg}`
                : profile
            }
            ref={imgSrc}
            onLoad={() =>
              setImage({
                ...image,
                width: imgSrc.current?.naturalWidth,
                height: imgSrc.current?.naturalHeight,
              })
            }
            style={{
              transform:
                image.width < image.height
                  ? `scale(${(image.height / image.width) * 1.1})`
                  : "",
            }}
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
        <Player />
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
