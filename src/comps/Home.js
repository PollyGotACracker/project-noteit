import { useState, useEffect } from "react";
import "../css/Home.css";
import { getToday, msgList as msgListData } from "../data/HomeData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faHeart } from "@fortawesome/free-solid-svg-icons";
const Main = () => {
  const [date, setDate] = useState(getToday().date);
  const [time, setTime] = useState(getToday().time);
  const [msgList, setMsgList] = useState(msgListData);

  // setInterval 은 설정한 시간을 보장하지 않기 때문에 setTimeout 재귀함수 사용
  const changeClock = () => {
    setDate(getToday().date);
    setTime(getToday().time);
  };
  setTimeout(changeClock, setTimeout(changeClock, 1000), 1000);

  const typeWriter = (text, elem) => {
    let i = 0;
    let speed = 0;
    const typing = () => {
      if (i < text.length) {
        switch (text.charAt(i)) {
          case " ":
            speed = 160;
            elem.insertAdjacentHTML("beforeend", "\xA0");
            // elem.style.animationName = "none";
            break;
          case ",":
          case ".":
            elem.insertAdjacentHTML("beforeend", text.charAt(i));
            speed = Math.floor(Math.random() * (900 - 500 + 1)) + 500;
            // elem.style.animationName = "blink";
            break;
          default:
            speed = 160;
            elem.insertAdjacentHTML("beforeend", text.charAt(i));
          // elem.style.animationName = "none";
        }
        i++;
        setTimeout(typing, speed);
      }
      // else {
      //   elem.style.animationName = "blink";
      // }
    };
    typing();
  };

  /**
   * cf)
   * useEffect() 내에서 console.log 가 두 번 이상 실행될 경우
   * <React.StrictMode>
   * 코드의 문제를 감지하고 경고하기 위해 구성 요소를 두 번 렌더링
   */

  useEffect(() => {
    const index = Math.floor(Math.random() * msgList.length + 1);
    const msg = msgList[index - 1];
    const box = document.querySelector(".Main .msgBox .msg");
    typeWriter(msg, box);
  }, []);

  return (
    <main className="Main">
      <section className="Main leftSidebar">
        <div className="title">앵알앵알 단어교실</div>
        <div className="rndSub">랜덤 주제가 들어갈 영역</div>
        <div className="today">{date}</div>
        <div className="today">{time}</div>
      </section>
      <section className="Main center">
        <div className="msgBox">
          <span className="msg"></span>
        </div>
        <div className="Main imgBird">못생긴 앵무새 그림이 들어갈 영역</div>
      </section>
      <section className="Main rightSidebar">
        <button className="btnBg">
          <FontAwesomeIcon icon={faVolumeHigh} />
        </button>
        <div className="point">
          <FontAwesomeIcon icon={faHeart} />
        </div>
      </section>
    </main>
  );
};

export default Main;
