import "@styles/dashboard.css";
import { useState, useRef, useEffect } from "react";
import { defaults } from "chart.js";
import { useQueries } from "react-query";
import { RiLineChartLine } from "react-icons/ri";
import getDashboardQueries from "@services/dashboard.service";
import { useUserContext } from "@contexts/userContext";
import { speakListData } from "@data/dashboard";
import Todo from "@components/dashboard/todo";
import Article from "@components/dashboard/article";
import NoStat from "@components/dashboard/noStat";
import Wrongs from "@components/dashboard/wrongs";
import Scores from "@components/dashboard/scores";

const DashboardPage = () => {
  const { userData } = useUserContext();
  const userId = "polly@gmail.com";
  const [{ data: todos }, { data: wrongs }, { data: scores }] = useQueries(
    getDashboardQueries(userId)
  );

  const speak = useRef(null);
  const speakMsgRef = useRef(null);
  const [speakList] = useState(speakListData);

  // default chart style
  defaults.font.family = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--font-family");
  defaults.font.size = "12";
  defaults.color = getComputedStyle(document.documentElement).getPropertyValue(
    "--subtext"
  );

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

  useEffect(() => {
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
          <div className="subject">
            최근 공부한 노트: {wrongs?.cat || "없음"}
          </div>
        </section>
        <Todo todos={todos} />
        {scores?.totalscore?.length !== 0 ? (
          <section className="center-box">
            <Wrongs
              cat={wrongs?.cat}
              subs={wrongs?.sub}
              wrongs={wrongs?.wrong}
            />
            <Article data={wrongs?.study} />
          </section>
        ) : (
          ""
        )}
        <div className="chart-round">
          <div className="title">
            <RiLineChartLine />
            퀴즈 기록
          </div>
          {scores?.score?.length !== 0 ? (
            <Scores
              dates={scores?.date}
              scores={scores?.score}
              totalscores={scores?.totalscore}
              percent={scores?.percent}
            />
          ) : (
            <NoStat msg={wrongs?.error} />
          )}
        </div>
      </section>
    </article>
  );
};

export default DashboardPage;
