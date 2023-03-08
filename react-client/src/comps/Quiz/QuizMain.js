import { useEffect, useState, useRef } from "react";
import "../../css/Quiz/QuizMain.css";

const QuizMain = () => {
  const [quizCatList, setQuizCatList] = useState([]);
  const [quizSubList, setQuizSubList] = useState([]);
  const [subIndex, setSubIndex] = useState(0);
  const [keyIndex, setKeyIndex] = useState(0);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/quiz/cat/get`).then((data) => data.json());
      setQuizCatList([...res]);
    })();
  }, []);

  const getQuizSubData = async (catid) => {
    let res = await fetch(`/quiz/${catid}/rndsub/get`).then((data) =>
      data.json()
    );
    // subject randomize
    const iterVal = (res.length - 1) * 5; // 배열 크기의 4 ~ 5배
    let i = 0;
    let _subData = [...res];
    while (i < iterVal) {
      const _i = Math.floor(Math.random() * res.length);
      const _j = Math.floor(Math.random() * res.length);
      [_subData[_j], _subData[_i]] = [_subData[_i], _subData[_j]];
      _subData = [..._subData];
      i++;
    }
    setQuizSubList([..._subData]);
  };

  // useEffect(() => {
  //   document.querySelector("input").focus();
  //   fetchs();
  // }, [fetchs]);

  useEffect(() => {
    console.log(quizSubList);
  }, [quizSubList]);

  return (
    <article className="Quiz">
      <div>뭘 공부해볼까용???</div>
      <section className="cat-list">
        {quizCatList.map((item) => (
          <div
            key={item.c_catid}
            onClick={() => {
              getQuizSubData(item.c_catid);
            }}
          >
            {item.c_category}
          </div>
        ))}
      </section>
      <section className="sub-list">{quizSubList[subIndex]?.s_subid}</section>
      <button
        onClick={() => {
          console.log(quizSubList[subIndex]?.s_subid);
          setSubIndex(subIndex + 1);
        }}
      >
        안녕!
      </button>
      <section
        style={{
          display: subIndex >= quizSubList.length ? "block" : "none",
        }}
      >
        끝!
      </section>
      <section className="left-sidebar">
        <div className="subject-box">
          <div className="title">&#183; 주제 &#183;</div>
          <div className="card">테스트</div>
        </div>
        <div className="keyword-box">
          <div className="title">&#183; 키워드 &#183;</div>
        </div>
        <div className="keyword-length">5</div>
      </section>
      <section className="center">
        <div className="msg-box">
          <input className="msg" placeholder="키워드를 입력하세요!"></input>
        </div>
        <div className="bird-img">사진 영역</div>
      </section>
    </article>
  );
};

export default QuizMain;
