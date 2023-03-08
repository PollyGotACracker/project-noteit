import { useState, useRef, useLayoutEffect } from "react";
import "../css/Home.css";
import { speakListData } from "../data/HomeData";

const Main = () => {
  const [speakList] = useState(speakListData);
  const speak = useRef(null);

  // 코드 수정할 것
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
    const index = Math.floor(Math.random() * speakList.length + 1);
    const msg = speakList[index - 1];
    const speak = typeWriter(msg);
    return () => {
      clearTimeout(speak);
    };
  }, []);

  return (
    <article className="Home">
      <section className="left-sidebar">
        <div className="rnd-subject">랜덤 주제 영역</div>
      </section>
      <section className="center">
        <div className="speak-box">
          <span className="speak" ref={speak}></span>
        </div>
        <div className="bird-img">사진 영역</div>
      </section>
    </article>
  );
};

export default Main;
