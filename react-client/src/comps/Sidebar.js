import "../css/Sidebar.css";
import Player from "./Player";
import { useUserContext } from "../context/UserContext";
import { GiStarsStack } from "react-icons/gi";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useState, useRef, forwardRef, useLayoutEffect } from "react";
import profile from "../assets/images/profile.png";
import { getToday } from "../data/HomeData";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

// 부모 comp 에서 ref 를 받아 내부 요소에 사용: 2번째 파라미터로 받아야
const Sidebar = forwardRef((props, ref) => {
  const [date, setDate] = useState(getToday().date);
  const [time, setTime] = useState(getToday().time);
  const { userData } = useUserContext();
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
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: searchValue }),
    };
    await fetch(`/note/search`, fetchOption).then((data) => data.json());
  };

  useLayoutEffect(() => {
    searchData(searchValue);
  }, [searchValue]);

  const searchKeyword = (e) => {
    if (e.keyCode === 13) {
      searchData(searchValue);
    }
  };

  return (
    <aside className="Sidebar" ref={ref}>
      <section className="clock">
        <div className="today">{date}</div>
        <div className="today">{time}</div>
      </section>
      <section className="profile">
        <div className="profile-img">
          <img
            alt="avatar"
            src={
              userData?.u_profileimg !== ""
                ? `http://localhost:3000/uploads/${userData?.u_profileimg}`
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
      <section className="logout">
        <RiLogoutBoxLine />
        <Link to={"/logout"}>로그아웃</Link>
      </section>
    </aside>
  );
});

export default Sidebar;
