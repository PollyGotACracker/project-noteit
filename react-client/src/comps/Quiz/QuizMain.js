import { Outlet } from "react-router-dom";
import "../../css/Quiz/QuizMain.css";

const QuizMain = () => {
  return (
    <article className="Quiz">
      <Outlet />
    </article>
  );
};

export default QuizMain;
