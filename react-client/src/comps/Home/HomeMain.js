import { useState, useRef, useLayoutEffect } from "react";
import "../../css/Home.css";
import { speakListData } from "../../data/HomeData";
import { useUserContext } from "../../context/UserContext";
import BoardTodo from "./BoardTodo";
import BoardStudy from "./BoardStudy";
import DoughnutChart from "./DoughnutChart";
import MultiChart from "./MultiChart";
import { defaults } from "chart.js";

const HomeMain = () => {
  const { userData } = useUserContext();
  const speak = useRef(null);
  const speakMsgRef = useRef(null);
  const [speakList] = useState(speakListData);
  const [dateData, setDateData] = useState([]);
  const [scoreData, setScoreData] = useState([]);
  const [totalScoreData, setTotalScoreData] = useState([]);
  const [catName, setCatName] = useState("");
  const [subData, setSubData] = useState([]);
  const [wrongData, setWrongData] = useState([]);
  const [studyData, setStudyData] = useState({});

  /**
   * cf)
   * useEffect() 내에서 console.log 가 두 번 이상 실행될 경우
   * <React.StrictMode>
   * 코드의 문제를 감지하고 경고하기 위해 구성 요소를 두 번 렌더링
   */

  // default chart style
  defaults.font.family = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--font-family");
  defaults.font.size = "12";
  defaults.color = getComputedStyle(document.documentElement).getPropertyValue(
    "--subtext"
  );

  useLayoutEffect(() => {
    (async () => {
      if (userData.u_userid !== "") {
        const doughnut = await fetch(`/${userData.u_userid}/stat/wrong`).then(
          (data) => data.json()
        );
        const line = await fetch(`/${userData.u_userid}/stat/round`).then(
          (data) => data.json()
        );
        if (doughnut.error || line.error) {
          alert(doughnut.error);
          return false;
        } else {
          setCatName(doughnut.cat);
          setSubData([...doughnut.sub]);
          setWrongData([...doughnut.wrong]);
          setStudyData({ ...doughnut.study });
          setDateData([...line.date]);
          setScoreData([...line.score]);
          setTotalScoreData([...line.totalscore]);
        }
      }
    })();
  }, [userData.u_userid, userData.u_totalscore]);

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
        speakMsgRef.current = setTimeout(typing, speed);
      } else {
        speak.current.style.animationName = "blink";
      }
    };
    typing();
  };

  useLayoutEffect(() => {
    const index = Math.floor(Math.random() * speakList.length + 1);
    const msg = speakList[index - 1];
    typeWriter(msg);
    return () => {
      clearTimeout(speakMsgRef.current);
    };
  }, []);

  return (
    <article className="Home">
      <div className="dashboard">DASHBOARD</div>
      <section className="content">
        <section className="top-box">
          <div className="speak-box">
            <span className="speak" ref={speak}></span>
          </div>
          <div className="subject">최근 공부한 노트: {catName}</div>
        </section>
        <BoardTodo />
        <section className="center-box">
          <DoughnutChart cat={catName} subs={subData} wrongs={wrongData} />
          <BoardStudy data={studyData} />
        </section>
        <MultiChart
          cat={catName}
          dates={dateData}
          scores={scoreData}
          totalscores={totalScoreData}
        />
      </section>
    </article>
  );
};

export default HomeMain;
