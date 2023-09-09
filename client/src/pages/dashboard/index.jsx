import "@styles/dashboard.css";
import { useState, useRef, useLayoutEffect } from "react";
import { defaults } from "chart.js";
import { RiLineChartLine } from "react-icons/ri";
import { useUserContext } from "@contexts/userContext";
import { speakListData } from "@data/dashboard";
import Todo from "@components/dashboard/todo";
import Article from "@components/dashboard/article";
import NoStat from "@components/dashboard/noStat";
import Wrongs from "@components/dashboard/wrongs";
import Scores from "@components/dashboard/scores";

const DashboardPage = () => {
  const { userData } = useUserContext();
  const speak = useRef(null);
  const speakMsgRef = useRef(null);
  const [boardMsg, setBoardMsg] = useState("");
  const [speakList] = useState(speakListData);
  const [dateData, setDateData] = useState([]);
  const [scoreData, setScoreData] = useState([]);
  const [totalScoreData, setTotalScoreData] = useState([]);
  const [catName, setCatName] = useState("");
  const [subData, setSubData] = useState([]);
  const [wrongData, setWrongData] = useState([]);
  const [percentData, setPercentData] = useState([]);
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
        const wrong = await fetch(
          `/server/${userData.u_userid}/stat/wrong`
        ).then((data) => data.json());
        const round = await fetch(
          `/server/${userData.u_userid}/stat/round`
        ).then((data) => data.json());
        if (wrong.error || round.error) {
          setBoardMsg(wrong.error);
          return false;
        } else {
          setCatName(wrong.cat);
          setSubData([...wrong.sub]);
          setWrongData([...wrong.wrong]);
          setStudyData({ ...wrong.study });
          setDateData([...round.date]);
          setScoreData([...round.score]);
          setTotalScoreData([...round.totalscore]);
          setPercentData([...round.percent]);
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
          <div className="subject">최근 공부한 노트: {catName || "없음"}</div>
        </section>
        <Todo />
        {totalScoreData.length !== 0 ? (
          <section className="center-box">
            <Wrongs cat={catName} subs={subData} wrongs={wrongData} />
            <Article data={studyData} />
          </section>
        ) : (
          ""
        )}
        <div className="chart-round">
          <div className="title">
            <RiLineChartLine />
            퀴즈 기록
          </div>
          {scoreData.length !== 0 ? (
            <Scores
              dates={dateData}
              scores={scoreData}
              totalscores={totalScoreData}
              percent={percentData}
            />
          ) : (
            <NoStat msg={boardMsg} />
          )}
        </div>
      </section>
    </article>
  );
};

export default DashboardPage;
