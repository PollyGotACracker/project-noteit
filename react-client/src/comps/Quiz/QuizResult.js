import { useLocation, Link } from "react-router-dom";

const QuizResult = () => {
  const location = useLocation();
  const { wrongAnswer, score, allKeyScore } = location.state;
  const ratio = score / allKeyScore;

  // users totalscore update
  // keywords wrongcount update
  // score insert
  return (
    <section>
      <div>
        {score} / {allKeyScore}
      </div>
      <div>
        {ratio === 1
          ? "최고예요!!"
          : ratio >= 0.5
          ? "잘했어요!!"
          : ratio >= 0.3
          ? "괜찮아요!"
          : "다시 공부해보세요!"}
      </div>
      <div>
        틀린 문제 목록
        {wrongAnswer.map((item) => (
          <div key={item.s_subid}>
            <div>
              <span>{item.s_subject}</span>
              <span>{item.wrong.length} / </span>
              <span>{item.s_keycount}</span>
              <Link to={`/note/subject/${item.s_catid}/${item.s_subid}`}>
                노트 보기
              </Link>
            </div>
            {item.wrong.map((item) => (
              <div key={item.k_keyid}>
                <span>{item.k_keyword}</span>
                <span>{item.answer}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <Link to={`/quiz/${wrongAnswer[0].s_catid}`}>다시 풀기</Link>
    </section>
  );
};

export default QuizResult;
