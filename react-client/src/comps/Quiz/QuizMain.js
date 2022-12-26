import { useEffect, useCallback } from "react";
import "../../css/Quiz/QuizMain.css";
import Sidebar from "../Sidebar";

const QuizMain = () => {
  const fetchs = useCallback(async () => {
    let res = await fetch(`/quiz/rnd/select`);
    res = await res.json();
    console.log(res);
  });

  useEffect(() => {
    document.querySelector("input").focus();
    fetchs();
  }, []);

  return (
    <main className="Quiz">
      <section className="left-sidebar">
        <div className="subject-box">
          <div className="title">&#183; 주제 &#183;</div>
          <div className="card">정보처리기사</div>
        </div>
        <div className="keyword-box">
          <div className="title">&#183; 키워드 &#183;</div>
        </div>
      </section>
      <section className="center">
        <div className="msg-box">
          <input className="msg" placeholder="좋아좋아용!!"></input>
        </div>
        <div className="bird-img">못생긴 앵무새 그림이 들어갈 영역</div>
      </section>
      <Sidebar />
    </main>
  );
};

export default QuizMain;
