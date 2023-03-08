import { Outlet } from "react-router-dom";
import "../../css/Quiz/QuizMain.css";

const QuizMain = () => {
  // useEffect(() => {
  //   document.querySelector("input").focus();
  //   fetchs();
  // }, [fetchs]);

  return (
    <article className="Quiz">
      <Outlet />
      <section className="center">
        <div className="msg-box">
          <input className="msg" placeholder="키워드를 입력하세요!"></input>
        </div>
        <div className="bird-img">사진 영역</div>
      </section>
    </article>
  );
};

export default QuizMain;
