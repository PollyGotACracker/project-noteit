import { Outlet } from "react-router-dom";
import "@styles/quiz.css";

const QuizPage = () => {
  return (
    <article className="Quiz">
      <Outlet />
    </article>
  );
};

export default QuizPage;
