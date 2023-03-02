import { useState, useRef, useLayoutEffect } from "react";
import "../css/Home.css";
import { getToday, speakListData } from "../data/HomeData";
import Sidebar from "./Sidebar";

const Main = () => {
  const [date, setDate] = useState(getToday().date);
  const [time, setTime] = useState(getToday().time);
  const [speakList] = useState(speakListData);
  const speak = useRef(null);

  // setInterval 은 설정한 시간을 보장하지 않기 때문에 setTimeout 재귀함수 사용
  const changeClock = () => {
    setDate(getToday().date);
    setTime(getToday().time);
  };

  const typeWriter = (text) => {
    let i = 0;
    let speed = 0;
    const typing = () => {
      if (i < text.length) {
        switch (text.charAt(i)) {
          case " ":
            speed = 160;
            speak.current.insertAdjacentHTML("beforeend", "\xA0");
            speak.current.style.animationName = "none";
            break;
          case ",":
          case ".":
            speak.current.insertAdjacentHTML("beforeend", text.charAt(i));
            speed = Math.floor(Math.random() * (900 - 500 + 1)) + 500;
            speak.current.style.animationName = "blink";
            break;
          default:
            speed = 160;
            speak.current.insertAdjacentHTML("beforeend", text.charAt(i));
            speak.current.style.animationName = "none";
        }
        i++;
        setTimeout(typing, speed);
      } else {
        speak.current.style.animationName = "blink";
      }
    };
    typing();
  };

  /**
   * cf)
   * useEffect() 내에서 console.log 가 두 번 이상 실행될 경우
   * <React.StrictMode>
   * 코드의 문제를 감지하고 경고하기 위해 구성 요소를 두 번 렌더링
   */

  useLayoutEffect(() => {
    const clock = setTimeout(changeClock, setTimeout(changeClock, 1000), 1000);
    const index = Math.floor(Math.random() * speakList.length + 1);
    const msg = speakList[index - 1];
    const speak = typeWriter(msg);
    return () => {
      clearTimeout(clock);
      clearTimeout(speak);
    };
  }, []);

  return (
    <main className="Home">
      <section className="left-sidebar">
        <div className="rnd-subject">랜덤 주제 영역</div>
        <div className="today">{date}</div>
        <div className="today">{time}</div>
      </section>
      <section className="center">
        <div className="speak-box">
          <span className="speak" ref={speak}></span>
        </div>
        <div className="bird-img">사진 영역</div>
      </section>
      <Sidebar />
    </main>
  );
};

export default Main;
