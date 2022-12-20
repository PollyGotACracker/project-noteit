import { useState, useEffect } from "react";
import "../css/Main.css";
import { getToday, msgList as msgListData } from "../data/HomeData";

const Main = () => {
  const [date, setDate] = useState(getToday().date);
  const [time, setTime] = useState(getToday().time);
  const [msgList, setMsgList] = useState(msgListData);

  setInterval(() => {
    setDate(getToday().date);
    setTime(getToday().time);
  }, 1000);

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
    const box = document.querySelector(".Main .msg");
    typeWriter(msg, box);
  }, []);

  return (
    <main className="Main">
      <section>
        <div className="Main today">{date}</div>
        <div className="Main today">{time}</div>
        <div className="Main msgBox">
          <span className="msg"></span>
        </div>
        <div className="Main img"></div>
      </section>
    </main>
  );
};

export default Main;
