import { useState, useRef, useLayoutEffect } from "react";
import "../css/Home.css";
import { speakListData } from "../data/HomeData";
import { useUserContext } from "../context/UserContext";
import LineChart from "./LineChart";
import DoughnutChart from "./DoughnutChart";
import { defaults } from "chart.js";

const Main = () => {
  const [speakList] = useState(speakListData);
  const speak = useRef(null);
  const { userData } = useUserContext();
  const [dateData, setDateData] = useState([]);
  const [scoreData, setScoreData] = useState([]);
  const [totalScoreData, setTotalScoreData] = useState([]);
  const [catName, setCatName] = useState("");
  const [subData, setSubData] = useState([]);
  const [wrongData, setWrongData] = useState([]);

  // 코드 수정할 것
  const typeWriter = (text) => {
    // let i = 0;
    // let speed = 0;
    // const typing = () => {
    //   if (i < text.length) {
    //     switch (text.charAt(i)) {
    //       case " ":
    //         speed = 160;
    //         speak.current.insertAdjacentHTML("beforeend", "\xA0");
    //         speak.current.style.animationName = "none";
    //         break;
    //       case ",":
    //       case ".":
    //         speak.current.insertAdjacentHTML("beforeend", text.charAt(i));
    //         speed = Math.floor(Math.random() * (900 - 500 + 1)) + 500;
    //         speak.current.style.animationName = "blink";
    //         break;
    //       default:
    //         speed = 160;
    //         speak.current.insertAdjacentHTML("beforeend", text.charAt(i));
    //         speak.current.style.animationName = "none";
    //     }
    //     i++;
    //     setTimeout(typing, speed);
    //   } else {
    //     speak.current.style.animationName = "blink";
    //   }
    // };
    // typing();
  };

  /**
   * cf)
   * useEffect() 내에서 console.log 가 두 번 이상 실행될 경우
   * <React.StrictMode>
   * 코드의 문제를 감지하고 경고하기 위해 구성 요소를 두 번 렌더링
   */

  defaults.font.size = "15";
  defaults.color = getComputedStyle(document.documentElement).getPropertyValue(
    "--subtext"
  );

  useLayoutEffect(() => {
    (async () => {
      if (userData.u_userid !== "") {
        const line = await fetch(`${userData.u_userid}/stat/round`).then(
          (data) => data.json()
        );
        const doughnut = await fetch(`${userData.u_userid}/stat/wrong`).then(
          (data) => data.json()
        );
        if (line.error || doughnut.error) {
          alert(line.error);
          return false;
        } else {
          setDateData([...line.date]);
          setScoreData([...line.score]);
          setTotalScoreData([...line.totalscore]);
          setCatName(doughnut.cat);
          setSubData([...doughnut.sub]);
          setWrongData([...doughnut.wrong]);
        }
      }
    })();
  }, [userData.u_userid, userData.u_totalscore]);

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
      <section className="top-box">
        <div className="subject">최근 공부한 노트: {catName}</div>
      </section>
      <section className="center-box">
        <section className="chart-wrong">
          <DoughnutChart cat={catName} subs={subData} wrongs={wrongData} />
        </section>
        <div className="speak-box">
          <span className="speak" ref={speak}></span>
        </div>
      </section>
      <section className="chart-round">
        <LineChart
          cat={catName}
          dates={dateData}
          scores={scoreData}
          totalscores={totalScoreData}
        />
      </section>
    </article>
  );
};

export default Main;
