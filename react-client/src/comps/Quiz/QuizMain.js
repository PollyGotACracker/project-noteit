import { useEffect } from "react";
// import { useVocaContext } from "../../context/VocaContext";
import "../../css/Quiz/QuizMain.css";

const QuizMain = () => {
  // const { vocaArr } = useVocaContext();
  // console.log(vocaArr);
  useEffect(() => {
    document.querySelector("input").focus();
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
      <section className="right-sidebar">
        <div className="music-btn">배경음악토글 컴포넌트할래요</div>
        <div className="point">포인트</div>
      </section>
    </main>
  );
};

export default QuizMain;
