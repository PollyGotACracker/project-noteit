import { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { FaFileAlt, FaTags } from "react-icons/fa";
import { getQuizCat } from "../../service/quiz.service";

export const quizCatLoader = async () => {
  const _data = await getQuizCat();
  return _data;
};

const QuizCat = () => {
  const _data = useLoaderData();
  const [quizCatList] = useState([..._data]);

  return (
    <section className="Cat">
      <div className="title">공부할 노트를 선택하세요!</div>
      <div className="cat-list">
        {quizCatList.map((item) => (
          <Link
            className="cat-item"
            key={item.c_catid}
            to={`/quiz/${item.c_catid}`}
          >
            <span>{item.c_category}</span>
            <span>공부 날짜</span>
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

export default QuizCat;
