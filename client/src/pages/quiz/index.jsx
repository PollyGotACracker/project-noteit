import "@styles/quiz/quiz.css";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import { FaFileAlt, FaTags } from "react-icons/fa";
import { userState } from "@recoils/user";
import useQuizFetcher from "@services/useQuizFetcher";
import { getQuizTimer, setQuizTimer } from "@utils/manageQuizTimerStorage";
import { URLS } from "@/router";

const QuizIndexPage = () => {
  const { getQuizCategories } = useQuizFetcher();
  const userData = useRecoilValue(userState);
  const { data: quizCatList } = useQuery(
    getQuizCategories({ userId: userData.u_userid })
  );

  const saveQuizTimer = (e) => setQuizTimer(e.target.value);

  return (
    <main className="Quiz Index">
      <div className="head">
        <span>노트 이름</span>
        <span>마지막 퀴즈 날짜</span>
        <span>주제 수</span>
        <span>키워드 수</span>
      </div>
      <section className="content overflow-list full-list">
        {quizCatList?.map((item) => (
          <Link
            className="item"
            key={item?.c_catid}
            to={`${URLS.QUIZ_GAME}/${item?.c_catid}`}
          >
            <span>{item?.c_category}</span>
            <span>{item?.c_quizdate}</span>
            <span>
              <FaFileAlt />
              {item?.c_subcount}
            </span>
            <span>
              <FaTags />
              {item?.s_keycount}
            </span>
          </Link>
        ))}
      </section>
      <div className="timer-container">
        <label htmlFor="quizTimer">
          타이머
          <input
            id="quizTimer"
            className="timer"
            type="number"
            defaultValue={getQuizTimer() || 0}
            step={10}
            min={0}
            onChange={saveQuizTimer}
          />
          초
        </label>
      </div>
    </main>
  );
};

export default QuizIndexPage;
