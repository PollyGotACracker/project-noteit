import { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { FaFileAlt, FaTags } from "react-icons/fa";
import { getQuizCat } from "@services/quiz.service";

export const quizCatLoader = async () => {
  const _data = await getQuizCat();
  return _data;
};

const QuizCatPage = () => {
  const _data = useLoaderData();
  const [quizCatList] = useState([..._data]);

  return (
    <section className="Cat">
      <div className="title">공부할 노트를 선택하세요</div>
      <div className="head">
        <span>노트 이름</span>
        <span>마지막 퀴즈 날짜</span>
        <span>총 주제 수</span>
        <span>총 키워드 수</span>
      </div>
      <div className="cat-list">
        {quizCatList.map((item) => (
          <Link
            className="cat-item"
            key={item.c_catid}
            to={`/quiz/${item.c_catid}`}
          >
            <span>{item.c_category}</span>
            <span>{item?.c_quizdate}</span>
            <span>
              <FaFileAlt />
              {item.c_subcount}
            </span>
            <span>
              <FaTags />
              {item.s_keycount}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default QuizCatPage;
