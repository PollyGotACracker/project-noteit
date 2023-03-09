import { useEffect, useCallback, useState, useRef } from "react";
import { useLoaderData, Link, useNavigate } from "react-router-dom";
import { msgList } from "../../data/QuizData";
import { getQuizSub } from "../../service/quiz.service";
import { FaSadTear } from "react-icons/fa";

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
  const [subIndex, setSubIndex] = useState(0);
  const [keyIndex, setKeyIndex] = useState(0);
  const [feedbackMsg, setFeedbackMsg] = useState(msgList.start);
  // 전역변수로 만들 것
  const [wrongAnswer, setWrongAnswer] = useState([]);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const userAnswerRef = useRef(null);
  const msgInputRef = useRef(null);

  const onKeyDownHandler = (e) => {
    const val = quizKeyList[keyIndex]?.k_keyword?.replaceAll(" ", "");
    const answer = userAnswer?.replaceAll(" ", "");
    const lastSubIndex = quizSubList.length - 1;
    const lastKeyIndex = quizKeyList.length - 1;
    if (e.keyCode === 13) {
      if (val === answer) {
        setFeedbackMsg(msgList.correct);
        setScore(score + 5);
      }
      if (val !== answer) {
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
          if (_prev.length === 0) {
            _prev = [..._prev, _newSubData];
            return _prev;
          } else {
            if (_prev[_prev.length - 1].s_subid !== _subid) {
              console.log(_prev[_prev.length - 1].s_subid, _subid);
              _prev = [..._prev, _newSubData];
              return _prev;
            }
            if (_prev[_prev.length - 1].s_subid === _subid) {
              console.log(_prev[_prev.length - 1].s_subid, _subid);
              _prev[_prev.length - 1].wrong = [
                ..._prev[_prev.length - 1].wrong,
                _keyData,
              ];
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

  useEffect(() => {
    console.log(wrongAnswer);
  }, [wrongAnswer]);

  const showResult = () => {
    msgInputRef.current.style.visibility = "hidden";
    setQuizKeyList([]);
    let msgDelay = 1000;
    if (feedbackMsg === msgList.start || feedbackMsg === msgList.nextSub) {
      msgDelay = 0;
    }
    setTimeout(() => {
      setFeedbackMsg(msgList.calc);
      setTimeout(() => {
        nav(`/quiz/result`, {
          state: {
            wrongAnswer: wrongAnswer,
            score: score,
            allKeyScore: allKeyScore,
          },
        });
      }, 2000);
    }, msgDelay);
  };

  useEffect(() => {
    // 키워드에서 중복되는 단어는 입력 안해도 되게 단어를 추출하면 좋겠음
    // 보통 뒤에서부터 중복될 듯??
    // setQuizKeyList
  }, [subIndex]);

  useEffect(() => {
    userAnswerRef.current.focus();
  }, [onKeyDownHandler]);

  // keyword 에서 틀린 횟수 표시하는 칼럼 추가

  return (
    <div className="Sub">
      <div className="subject-box">
        <div className="category">{quizSubList[subIndex]?.s_category}</div>
        <div>{quizSubList.length}</div>
        <div className="subject">
          {subIndex + 1}
          {quizSubList[subIndex]?.s_subject}
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
          <FaSadTear />이 주제 건너뛰기
        </button>
      </div>
      <div>{feedbackMsg}</div>
      <div>
        점수: {score} / {allKeyScore}
      </div>
      <div className="keyword-box">
        <div className="keyword">{quizKeyList[keyIndex]?.k_desc}</div>
      </div>
      <section className="center">
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
  );
};

export default QuizSub;
