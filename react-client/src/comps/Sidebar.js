import "../css/Sidebar.css";
import Player from "./Player";
import { useUserContext } from "../context/UserContext";
import { GiStarsStack } from "react-icons/gi";
import { useState, useRef, forwardRef, useLayoutEffect } from "react";
import profile from "../assets/images/profile.png";
import { getToday } from "../data/HomeData";
import { Link } from "react-router-dom";

const Sidebar = forwardRef((props, ref) => {
  const { blocker } = props;
  const [date, setDate] = useState(getToday().date);
  const [time, setTime] = useState(getToday().time);
  const { userData } = useUserContext();
  const [image, setImage] = useState({ width: "", height: "" });
  const imgSrc = useRef();

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

  return (
    <aside className="Sidebar" ref={ref}>
      <section className="profile">
        <div className="profile-img">
          <img
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
      </section>
      <section className="player">
        <Player />
      </section>
      <section className="clock">
        <div className="today">{date}</div>
        <div className="today">{time}</div>
      </section>
      <section className="menu">
        <Link
          to={"/setting"}
          onClick={() => {
            ref.current.className = "Sidebar";
            blocker.current.className = "blocker";
          }}
        >
          설정
        </Link>
        <Link to={"/logout"}>로그아웃</Link>
      </section>
    </aside>
  );
});

export default Sidebar;
