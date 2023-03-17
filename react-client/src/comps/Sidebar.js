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

  // const searchData = async (value) => {
  //   setSearchValue(value);
  //   const fetchOption = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ value: searchValue, catid: catid }),
  //   };
  //   await fetch(`/note/sub/search`, fetchOption)
  //     .then((data) => data.json())
  //     .then((data) => {
  //       setNoteSubList([...data]);
  //     });
  // };

  // useLayoutEffect(() => {
  //   searchData(searchValue);
  // }, [searchValue]);

  // const searchKeyword = (e) => {
  //   if (e.type === "click" || (e.type === "keydown" && e.keyCode === 13)) {
  //     searchData(searchValue);
  //   }
  // };

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
          <GiStarsStack /> {userData?.u_totalscore}
        </div>
        {/* <Link
          to={"/setting"}
          onClick={() => {
            ref.current.className = "Sidebar";
            blocker.current.className = "blocker";
          }}
        >
          설정
        </Link> */}
      </section>
      <section className="player">
        <Player />
      </section>
      <form>
        <input
          className="input"
          placeholder="검색어를 입력하세요..."
          onChange={(e) => setSearchValue(e.target.value)}
          // onKeyDown={searchKeyword}
        />
        <button
          type="button"
          className="search"
          title="검색"
          // onClick={searchKeyword}
        >
          <BsSearch />
        </button>
      </form>
      <section className="logout">
        <RiLogoutBoxLine />
        <Link to={"/logout"}>로그아웃</Link>
      </section>
    </aside>
  );
});

export default Sidebar;
