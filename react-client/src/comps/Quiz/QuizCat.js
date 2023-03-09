import { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { getQuizCat } from "../../service/quiz.service";

export const quizCatLoader = async () => {
  const _data = await getQuizCat();
  return _data;
};

const QuizCat = () => {
  const _data = useLoaderData();
  const [quizCatList, setQuizCatList] = useState([..._data]);

  return (
    <section className="Cat">
      <div className="category-box">
        <div>공부할 노트를 선택하세요!</div>
        {quizCatList.map((item) => (
          <Link key={item.c_catid} to={`/quiz/${item.c_catid}`}>
            {item.c_category}
            {item.c_subcount}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default QuizCat;
