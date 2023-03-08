import { useEffect, useState, useRef } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { getQuizSub } from "../../service/quiz.service";
import { FaSadTear } from "react-icons/fa";

export const quizSubLoader = async ({ params }) => {
  const catid = params?.catid;
  const _data = await getQuizSub(catid);
  console.log(_data[0]["tbl_keywords"]);
  return _data;
};

const QuizSub = () => {
  const _data = useLoaderData();
  const [quizSubList, setQuizSubList] = useState([..._data]);
  const [quizKeyList, setQuizKeyList] = useState([..._data[0]["tbl_keywords"]]);
  const [subIndex, setSubIndex] = useState(0);
  const [keyIndex, setKeyIndex] = useState(0);

  return (
    <div className="Sub">
      <div className="subject-box">
        <div className="category">{quizSubList[subIndex]?.s_category}</div>
        <div className="subject">{quizSubList[subIndex]?.s_subject}</div>
        <div className="keycount">{quizSubList[subIndex]?.s_keycount}</div>
        <button
          onClick={() => {
            setSubIndex(subIndex + 1);
            setQuizKeyList([...quizSubList[subIndex + 1].tbl_keywords]);
            setKeyIndex(0);
          }}
        >
          <FaSadTear />이 주제 건너뛰기
        </button>
      </div>
      <div className="keyword-box">
        <div>뭘까요?</div>
        <div className="keyword">{quizKeyList[keyIndex].k_desc}</div>
      </div>
      <div
        style={{
          display: subIndex >= quizSubList.length ? "block" : "none",
        }}
      >
        끝!
      </div>
    </div>
  );
};

export default QuizSub;
