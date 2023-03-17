import { useLocation, Link } from "react-router-dom";
import { transferToday } from "../../data/QuizData";
import { MdRestartAlt } from "react-icons/md";
import { BsJournalText } from "react-icons/bs";
import { RiGoogleLine } from "react-icons/ri";

const QuizResult = () => {
  const location = useLocation();
  const { wrongAnswer, score, userScore, allKeyScore } = location.state;
  const { dateStr, timeStr } = transferToday(
    userScore.sc_date,
    userScore.sc_time
  );
  const ratio = score / allKeyScore;

  // users totalscore update
  // keywords wrongcount update
  // score insert
  return (
    <section className="result">
      <div className="score">
        {score} / {allKeyScore}
      </div>
      <div className="feedback">
        {ratio === 1
          ? "최고예요!!"
          : ratio >= 0.6
          ? "잘했어요!!"
          : ratio >= 0.4
          ? "괜찮아요!"
          : "다시 공부해보세요!"}
      </div>
      <div className="date">{dateStr}</div>
      <div className="time">{timeStr}</div>
      <Link className="restart" to={`/quiz/${wrongAnswer[0].s_catid}`}>
        <MdRestartAlt />
        다시 풀기
      </Link>
      <div className="wrong-list">
        <div className="title">틀린 문제 목록</div>
        {wrongAnswer.map((item) => (
          <div className="wrong-item" key={item.s_subid}>
            <div className="subject">
              <Link to={`/note/subject/${item.s_catid}/${item.s_subid}`}>
                <BsJournalText />
                {item.s_subject}
              </Link>
              <div>키워드 수: {item.s_keycount}</div>
              <div>오답 수: {item.wrong.length}</div>
            </div>
            {item.wrong.map((keyword) => (
              <div className="wrong-keyword" key={keyword.k_keyid}>
                <span className="keyword">{keyword.k_keyword}</span>
                <a
                  href={`https://www.google.com/search?q=${item.s_subject} ${keyword.k_keyword}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <RiGoogleLine />
                  검색
                </a>
                <div className="desc">{keyword.k_desc}</div>
                <div className="answer">제출: {keyword.answer}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuizResult;
