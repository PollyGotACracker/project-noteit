import "@styles/quiz/quiz.css";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { FaFileAlt, FaTags } from "react-icons/fa";
import { getQuizCategories } from "@services/quiz.service";
import { URLS } from "@/router";

const QuizIndexPage = () => {
  const userId = "polly@gmail.com";
  const { data: quizCatList } = useQuery(getQuizCategories({ userId }));

  return (
    <main className="Quiz">
      <section className="Index">
        <div className="title">공부할 노트를 선택하세요</div>
        <div className="head">
          <span>노트 이름</span>
          <span>마지막 퀴즈 날짜</span>
          <span>총 주제 수</span>
          <span>총 키워드 수</span>
        </div>
        <div className="cat-list">
          {quizCatList?.map((item) => (
            <Link
              className="cat-item"
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
        </div>
      </section>
    </main>
  );
};

export default QuizIndexPage;
