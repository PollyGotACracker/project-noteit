import { useLocation } from "react-router-dom";

const QuizResult = () => {
  const location = useLocation();
  const { wrongAnswer, score, allKeyScore } = location.state;
  const ratio = score / allKeyScore;

  // users cscore update
  // keywords wrongcount update
  // score insert
  return (
    <section>
      <div>
        틀린 문제 목록
        {wrongAnswer.map((item) => (
          <div key={item.s_subid}>
            <div>{item.s_subject}</div>
            {item.wrong.map((item) => (
              <div key={item.k_keyid}>{item.k_keyword}</div>
            ))}
          </div>
        ))}
      </div>
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
    </section>
  );
};

export default QuizResult;
