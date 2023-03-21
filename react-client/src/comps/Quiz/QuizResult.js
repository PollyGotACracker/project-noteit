import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { transferToday } from "../../data/QuizData";
import { useUserContext } from "../../context/UserContext";
import { getUserData } from "../../service/user.service";
import { insertQuizScore } from "../../service/quiz.service";
import { BsArrowRepeat } from "react-icons/bs";
import { BsJournalText } from "react-icons/bs";
import { RiGoogleLine } from "react-icons/ri";
import { FaRegSave, FaTag } from "react-icons/fa";

const QuizResult = () => {
  const location = useLocation();
  const { setUserData } = useUserContext();
  const { wrongAnswer, userScore } = location.state;
  const { dateStr, timeStr } = transferToday(
    userScore.sc_date,
    userScore.sc_time
  );
  const [saveMsg, setSaveMsg] = useState("");
  const ratio = userScore.sc_score / userScore.sc_totalscore;

  const saveScore = async () => {
    const keyids = wrongAnswer
      .map((sub) => sub.wrong.map((key) => key.k_keyid))
      .flat(2);
    const res = await insertQuizScore(userScore, keyids);
    if (res.error) {
      setSaveMsg(res.error);
      return false;
    }
    if (res.result) {
      const userData = await getUserData();
      setUserData({ ...userData });
      setSaveMsg(res.result);
    }
  };

  const hello = () => {
    setSaveMsg("기록을 저장 중입니다...");
  };

  return (
    <section className="result">
      <div className="score">
        {userScore.sc_score} / {userScore.sc_totalscore}
      </div>
      <div className="duration">{userScore.sc_duration}</div>
      <div className="feedback">
        {ratio === 1
          ? "정말 최고예요!"
          : ratio >= 0.6
          ? "잘했어요!"
          : ratio >= 0.4
          ? "괜찮아요!"
          : "다시 공부해보세요!"}
      </div>
      <div className="date">{dateStr}</div>
      <div className="time">{timeStr}</div>
      <div className="btn-box">
        <div className="save-msg">{saveMsg}</div>
        <button
          className="save"
          type="button"
          onClick={() => {
            hello();
            saveScore();
          }}
        >
          <FaRegSave />
          기록 저장
        </button>
        <Link className="restart" to={`/quiz/${userScore.sc_catid}`}>
          <BsArrowRepeat />
          다시 풀기
        </Link>
      </div>
      <div className="wrong-list">
        <div className="title">틀린 문제 목록</div>
        {wrongAnswer.map((item) => (
          <div className="wrong-item" key={item?.s_subid}>
            <div className="subject">
              <Link to={`/note/subject/${item?.s_catid}/${item?.s_subid}`}>
                <BsJournalText />
                {item?.s_subject}
              </Link>
              <div>· 키워드 수: {item?.s_keycount}</div>
              <div>· 오답 수: {item?.wrong.length}</div>
            </div>
            {item?.wrong.map((keyword) => (
              <div className="wrong-keyword" key={keyword?.k_keyid}>
                <span className="keyword">
                  <FaTag /> {keyword?.k_keyword}
                </span>
                <a
                  href={`https://www.google.com/search?q=${item?.s_subject} ${keyword.k_keyword}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <RiGoogleLine />
                  검색
                </a>
                <div className="desc">{keyword?.k_desc}</div>
                <div className="answer">제출: {keyword?.answer}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuizResult;
