import { useEffect, useState, useRef } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { msgList } from "../../data/QuizData";
import { getQuizSub } from "../../service/quiz.service";
import { IoArrowRedoCircleOutline } from "react-icons/io5";
import { BsCheck2Circle, BsDroplet, BsHourglassSplit } from "react-icons/bs";

import { IoIosHourglass } from "react-icons/io";

export const quizSubLoader = async ({ params }) => {
  const catid = params?.catid;
  const _data = await getQuizSub(catid);
  // 획득 가능한 총 점수 계산
  let allKeyScore = 0;
  for (let i of _data) {
    const keycount = i.s_keycount;
    allKeyScore += keycount * 5;
  }
  return { _data, allKeyScore };
};

const QuizSub = () => {
  const nav = useNavigate();
  const { _data, allKeyScore } = useLoaderData();
  const [quizSubList, setQuizSubList] = useState([..._data]);
  const [quizKeyList, setQuizKeyList] = useState([..._data[0]["tbl_keywords"]]);
  const [correctList, setCorrectList] = useState([]);
  const [subIndex, setSubIndex] = useState(0);
  const [keyIndex, setKeyIndex] = useState(0);
  const [feedbackMsg, setFeedbackMsg] = useState(msgList.start);
  // 전역변수로 만들 것
  const [wrongAnswer, setWrongAnswer] = useState([]);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const userAnswerRef = useRef(null);
  const feedbackRef = useRef(null);
  const msgInputRef = useRef(null);

  // 키워드에서 중복되는 단어는 입력 안해도 되게 단어를 추출하면 좋겠음
  // 보통 뒤에서부터 중복될 듯?

  const onKeyDownHandler = (e) => {
    const answer = userAnswer?.replaceAll(" ", "");
    const isCorrect = correctList.includes(answer);
    const lastSubIndex = quizSubList.length - 1;
    const lastKeyIndex = quizKeyList.length - 1;
    if (e.keyCode === 13) {
      if (isCorrect) {
        feedbackRef.current.style.animationName = "bounce";

        setFeedbackMsg(msgList.correct);
        setScore(score + 5);
      }
      if (!isCorrect) {
        feedbackRef.current.style.animationName = "shake";

        const _subid = quizSubList[subIndex].s_subid;
        const _keyData = { ...quizKeyList[keyIndex], answer: userAnswer };
        const _newSubData = {
          ...quizSubList[subIndex],
          wrong: [{ ..._keyData }],
        };
        delete _newSubData.tbl_keywords;
        setFeedbackMsg(msgList.wrong);
        setKeyIndex(keyIndex + 1);

        // 주제를 건너뛸 경우 나머지 키워드 전부 추가하는 코드 필요!!
        setWrongAnswer((prev) => {
          let _prev = [...prev];
          const length = _prev.length;
          if (length === 0) {
            _prev = [..._prev, _newSubData];
            return _prev;
          } else {
            if (_prev[length - 1].s_subid !== _subid) {
              _prev = [..._prev, _newSubData];
              return _prev;
            }
            if (_prev[length - 1].s_subid === _subid) {
              _prev[length - 1].wrong = [..._prev[length - 1].wrong, _keyData];
              return _prev;
            }
          }
        });
      }
      if (keyIndex < lastKeyIndex) {
        setKeyIndex(keyIndex + 1);
      }
      if (keyIndex === lastKeyIndex && subIndex < lastSubIndex) {
        setSubIndex(subIndex + 1);
        setQuizKeyList([...quizSubList[subIndex + 1].tbl_keywords]);
        setKeyIndex(0);
      }
      if (keyIndex === lastKeyIndex && subIndex === lastSubIndex) {
        showResult();
      }
      setUserAnswer("");
    }
  };

  // 키워드가 A(B, C) 일 경우 ["A", "B", "C"] 반환
  useEffect(() => {
    const currentKeyStr = quizKeyList[keyIndex]?.k_keyword;
    setCorrectList(() => {
      return currentKeyStr
        ?.replaceAll(" ", "")
        ?.split(/[({,\,,)})]{1}/)
        ?.filter((item) => item !== "");
    });
  }, [quizKeyList, keyIndex]);

  // 결과 표시 대기 timeout
  const showResult = () => {
    msgInputRef.current.readOnly = true;

    setQuizKeyList([]);
    let msgDelay = 2000;
    if (feedbackMsg === msgList.start || feedbackMsg === msgList.nextSub) {
      msgDelay = 0;
    }
    setTimeout(() => {
      // setFeedbackMsg(msgList.calc);
      // 임시 코드
      document.querySelector(".Sub").style.display = "none";
      document.querySelector(".loading").style.zIndex = "1";
      document.querySelector(".loading").style.opacity = "1";

      setTimeout(() => {
        nav(`/quiz/result`, {
          state: {
            wrongAnswer: wrongAnswer,
            score: score,
            allKeyScore: allKeyScore,
          },
        });
      }, 3000);
    }, msgDelay);
  };

  // input focus
  useEffect(() => {
    userAnswerRef.current.focus();
  }, [onKeyDownHandler]);

  return (
    <>
      <div className="Sub">
        <div className="subject-box">
          <div className="category">{quizSubList[subIndex]?.s_category}</div>
          <div>{quizSubList.length}</div>
          <div className="subject">
            {subIndex + 1}. {quizSubList[subIndex]?.s_subject}
          </div>
          <div className="keycount">{quizSubList[subIndex]?.s_keycount}</div>
          <button
            onClick={() => {
              if (subIndex < quizSubList.length - 1) {
                setFeedbackMsg(msgList.nextSub);
                setSubIndex(subIndex + 1);
                setQuizKeyList([...quizSubList[subIndex + 1].tbl_keywords]);
                setKeyIndex(0);
              } else {
                showResult();
              }
            }}
          >
            <IoArrowRedoCircleOutline />이 주제 건너뛰기
          </button>
        </div>
        <div className="feedback-msg" ref={feedbackRef}>
          {feedbackMsg === msgList.correct ? (
            <BsCheck2Circle />
          ) : feedbackMsg === msgList.wrong ? (
            <BsDroplet />
          ) : (
            ""
          )}
          {feedbackMsg}
        </div>
        <div>
          점수: {score} / {allKeyScore}
        </div>
        <div className="keyword-box">
          <div className="keyword-desc">{quizKeyList[keyIndex]?.k_desc}</div>
        </div>
        <section className="answer-box">
          <div className="msg-box" ref={msgInputRef}>
            <input
              className="msg"
              ref={userAnswerRef}
              placeholder="키워드를 입력하세요!"
              value={userAnswer}
              onChange={(e) => {
                setUserAnswer(e.target.value);
              }}
              onKeyDown={(e) => {
                onKeyDownHandler(e);
              }}
            />
          </div>
          <div className="bird-img">사진 영역</div>
        </section>
      </div>
      <section className="loading">
        <IoIosHourglass />
        <span>잠시만 기다려주세요...</span>
      </section>
    </>
  );
};

export default QuizSub;
