import { useEffect, useState, useRef, useCallback } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { msgList, initScore } from "../../data/QuizData";
import { getQuizSub } from "../../service/quiz.service";
import { IoIosHourglass } from "react-icons/io";
import { IoArrowRedoCircleOutline } from "react-icons/io5";
import { BsCheck2Circle, BsDroplet } from "react-icons/bs";

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
  const [userScore, setUserScore] = useState(initScore);
  const [correctList, setCorrectList] = useState([]);
  const [subIndex, setSubIndex] = useState(0);
  const [keyIndex, setKeyIndex] = useState(0);
  const [feedbackMsg, setFeedbackMsg] = useState(msgList.start);
  const [wrongAnswer, setWrongAnswer] = useState([]);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const subRef = useRef(null);
  const userAnswerRef = useRef(null);
  const feedbackRef = useRef(null);
  const msgInputRef = useRef(null);
  const descRef = useRef(null);
  const loadingRef = useRef(null);
  const showLoading = useRef(null);
  const showResult = useRef(null);
  const loc = useLocation();
  const [countDown, setCountDown] = useState(2000);

  const onKeyDownHandler = (e) => {
    const answer = userAnswer?.toUpperCase()?.replaceAll(" ", "");
    const isCorrect = correctList?.includes(answer);
    const lastSubIndex = quizSubList.length - 1;
    const lastKeyIndex = quizKeyList.length - 1;

    if (e.keyCode === 13) {
      if (answer === "") {
        return false;
      }
      if (isCorrect) {
        setFeedbackMsg(msgList.correct);
        setKeyIndex(keyIndex + 1);
        setScore(score + 5);
      }
      if (!isCorrect) {
        setFeedbackMsg(msgList.wrong);
        setKeyIndex(keyIndex + 1);
        addWrongItem({ state: "wrong", answer: userAnswer });
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
        navResult({ jump: false });
      }
      setUserAnswer("");
    }
  };

  // 문제를 건너뛰거나 틀릴 경우 틀린 문제 리스트 추가
  const addWrongItem = ({ state, answer = "건너뛴 문제입니다." }) => {
    setWrongAnswer((prev) => {
      let _prev = [...prev];
      const length = _prev.length;
      const lastSub = _prev[length - 1]?.s_subid;
      const _subid = quizSubList[subIndex].s_subid;

      // 데이터가 없을 경우, 마지막 sub 가 현재 sub 와 다른 sub 일 경우: 현재 sub 추가 후 다음 코드로
      if (length === 0 || (length !== 0 && lastSub !== _subid)) {
        const _newSubData = {
          ...quizSubList[subIndex],
          wrong: [],
        };
        delete _newSubData.tbl_keywords;
        _prev = [..._prev, _newSubData];
      }
      if (state === "wrong" || state === "nextKey") {
        const _keyData = { ...quizKeyList[keyIndex], answer: answer };
        const _prevWrong = _prev[_prev.length - 1]?.wrong;
        _prev[_prev.length - 1].wrong = [..._prevWrong, _keyData];
      }
      if (state === "nextSub") {
        const _keyDataList = quizKeyList
          ?.filter((_, index) => index >= keyIndex)
          ?.map((item) => (item = { ...item, answer: answer }));
        const _prevWrong = _prev[_prev.length - 1]?.wrong;
        _prev[_prev.length - 1].wrong = [..._prevWrong, ..._keyDataList];
      }

      return _prev;
    });
  };

  // 키워드가 A(B, c) 일 경우 ["A", "B", "C"] 반환
  useEffect(() => {
    const currentKeyStr = quizKeyList[keyIndex]?.k_keyword;
    setCorrectList(() => {
      return currentKeyStr
        ?.toUpperCase()
        ?.replaceAll(" ", "")
        ?.split(/[({,\,,)})]{1}/)
        ?.filter((item) => item !== "");
    });
  }, [quizKeyList, keyIndex]);

  // feedbackMsg animation
  useEffect(() => {
    feedbackRef.current.style.opacity = "1";
    feedbackRef.current.style.animationPlayState = "running";

    if (feedbackMsg === msgList.correct) {
      feedbackRef.current.style.animationName = "bounceMsg";
    }
    if (feedbackMsg === msgList.wrong) {
      feedbackRef.current.style.animationName = "shakeMsg";
    }
    const msgMoveStop = setTimeout(() => {
      feedbackRef.current.style.animationName = "";
      feedbackRef.current.style.animationPlayState = "paused";
      feedbackRef.current.style.opacity = "0";
    }, 2400);
    return () => clearTimeout(msgMoveStop);
  }, [subIndex, keyIndex, feedbackMsg, setFeedbackMsg]);

  // 결과 표시 대기 timeout
  const navResult = useCallback(
    ({ jump }) => {
      // 넘기기 버튼 클릭 방지
      subRef.current.style.pointerEvents = "none";
      userAnswerRef.current.disabled = true;
      descRef.current.style.opacity = "0";
      let msgDelay = 2400;

      // 문제를 넘겼을 경우 delay 0
      if (jump) {
        msgDelay = 0;
      }
      showLoading.current = setTimeout(() => {
        subRef.current.style.display = "none";
        loadingRef.current.style.zIndex = "1";
        loadingRef.current.style.opacity = "1";
        showResult.current = setInterval(() => {
          setCountDown((prev) => prev - 1000);
        }, 1000);
      }, msgDelay);
    },
    [subIndex, keyIndex]
  );

  useEffect(() => {
    // useNavigate-useLocation 으로 데이터 넘김
    // 새로고침해도 state 값이 initalize 안되게 하는 방법?
    if (countDown < 0) {
      nav(`/quiz/result`, {
        state: {
          wrongAnswer: wrongAnswer,
          score: score,
          userScore: userScore,
          allKeyScore: allKeyScore,
        },
        replace: true,
      });
      clearTimeout(showLoading.current);
      clearInterval(showResult.current);
    }
  }, [countDown]);

  // 다른 페이지로 넘어가면 navigate 실행 방지
  useEffect(() => {
    return () => {
      clearTimeout(showLoading.current);
      clearInterval(showResult.current);
    };
  }, [loc.pathname]);

  // input focus
  useEffect(() => {
    userAnswerRef.current.focus();
  }, [onKeyDownHandler]);

  return (
    <>
      <div className="Sub" ref={subRef}>
        <div className="subject-box">
          <div className="category">{quizSubList[subIndex]?.s_category}</div>
          <div>{quizSubList.length}</div>
          <div className="subject">
            {subIndex + 1}. {quizSubList[subIndex]?.s_subject}
          </div>
          <div className="keycount">{quizSubList[subIndex]?.s_keycount}</div>
          <button
            onClick={() => {
              const isLastSub = subIndex === quizSubList.length - 1;

              if (isLastSub === false) {
                setFeedbackMsg(msgList.nextSub);
                setSubIndex(subIndex + 1);
                setQuizKeyList([...quizSubList[subIndex + 1].tbl_keywords]);
                setKeyIndex(0);
                addWrongItem({ state: "nextSub" });
                return false;
              } else {
                addWrongItem({ state: "nextSub" });
                navResult({ jump: true });
                return false;
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
          {keyIndex + 1}
          <div className="keyword-desc" ref={descRef}>
            {quizKeyList[keyIndex]?.k_desc}
          </div>
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
          <button
            onClick={() => {
              const isLastSub = subIndex === quizSubList.length - 1;
              const isLastKey = keyIndex === quizKeyList.length - 1;

              if (isLastKey === false) {
                setFeedbackMsg(msgList.nextKey);
                setKeyIndex(keyIndex + 1);
                addWrongItem({ state: "nextKey" });
                return false;
              }
              if (isLastSub === false && isLastKey === true) {
                setFeedbackMsg(msgList.nextSub);
                setSubIndex(subIndex + 1);
                setQuizKeyList([...quizSubList[subIndex + 1].tbl_keywords]);
                setKeyIndex(0);
                addWrongItem({ state: "nextKey" });
                return false;
              }
              if (isLastSub === true && isLastKey === true) {
                addWrongItem({ state: "nextKey" });
                navResult({ jump: true });
                return false;
              }
            }}
          >
            모르겠어요
          </button>
          <div className="bird-img">사진 영역</div>
        </section>
      </div>
      <section className="loading" ref={loadingRef}>
        <IoIosHourglass />
        <span>점수 계산 중...</span>
      </section>
    </>
  );
};

export default QuizSub;
