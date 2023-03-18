import { useEffect, useState, useRef, useCallback } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { msgList, initScore } from "../../data/QuizData";
import { useUserContext } from "../../context/UserContext";
import { getQuizSub } from "../../service/quiz.service";
import { FaTags } from "react-icons/fa";
import { IoIosHourglass } from "react-icons/io";
import { IoArrowRedoCircleOutline } from "react-icons/io5";
import { BsStarFill, BsStars, BsCheck2Circle, BsDroplet } from "react-icons/bs";
import moment from "moment";

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
  const { _data, allKeyScore } = useLoaderData();
  const nav = useNavigate();
  const { userData } = useUserContext();
  const [quizSubList] = useState([..._data]);
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
  const scoreRef = useRef(null);
  const msgInputRef = useRef(null);
  const descRef = useRef(null);
  const loadingRef = useRef(null);
  const showLoading = useRef(null);
  const showResult = useRef(null);
  const loc = useLocation();
  const [countDown, setCountDown] = useState(2000);

  // 문제를 건너뛰거나 틀릴 경우 틀린 문제 리스트 추가
  const addWrongItem = useCallback(
    ({ state, answer = "건너뛴 문제입니다." }) => {
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
    },
    [keyIndex, quizKeyList, quizSubList, subIndex]
  );

  // 키워드가 A(B, c) 일 경우 ["A", "B", "C"] 반환
  useEffect(() => {
    const currentKeyStr = quizKeyList[keyIndex]?.k_keyword;
    setCorrectList(() => {
      return currentKeyStr
        ?.toUpperCase()
        ?.replaceAll(" ", "")
        ?.split(/[(,)]/)
        ?.filter((item) => item !== "");
    });
  }, [quizKeyList, keyIndex]);

  // feedbackMsg animation
  useEffect(() => {
    feedbackRef.current.style.opacity = "1";
    feedbackRef.current.style.animationPlayState = "running";

    if (feedbackMsg === msgList.correct) {
      feedbackRef.current.style.animationName = "jumpMsg";
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
  // cf) useCallback 사용 시 함수에서 사용하는 변수를 [] 에 적어야 최신 값을 반영
  const navResult = useCallback(
    ({ jump }) => {
      const _start = moment(
        `${userScore.sc_date} ${userScore.sc_time}`,
        "YYYY-MM-DD HH:mm:ss"
      );
      const _end = moment();
      const _duration = {
        HH: String(moment.duration(_end.diff(_start)).hours()).padStart(2, "0"),
        mm: String(moment.duration(_end.diff(_start)).minutes()).padStart(
          2,
          "0"
        ),
        ss: String(moment.duration(_end.diff(_start)).seconds()).padStart(
          2,
          "0"
        ),
      };

      setUserScore((prev) => {
        const _prev = {
          ...prev,
          sc_category: quizSubList[0].s_category,
          sc_catid: quizSubList[0].s_catid,
          sc_score: score,
          sc_duration: `${_duration.HH}:${_duration.mm}:${_duration.ss}`,
          sc_userid: userData.u_userid,
        };
        return _prev;
      });

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
    [score]
  );

  useEffect(() => {
    // useNavigate-useLocation 으로 데이터 넘김
    // 새로고침해도 state 값이 initalize 안되게 하는 방법?
    if (countDown < 0) {
      nav(`/quiz/result`, {
        state: {
          wrongAnswer: wrongAnswer,
          userScore: userScore,
          allKeyScore: allKeyScore,
        },
        replace: true,
      });
      clearTimeout(showLoading.current);
      clearInterval(showResult.current);
    }
  }, [allKeyScore, score, userScore, wrongAnswer, countDown]);

  // 다른 페이지로 넘어가면 navigate 실행 방지
  useEffect(() => {
    return () => {
      clearTimeout(showLoading.current);
      clearInterval(showResult.current);
    };
  }, [loc.pathname]);

  const onKeyDownHandler = useCallback(
    (e) => {
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
    },
    [
      addWrongItem,
      correctList,
      navResult,
      quizKeyList.length,
      quizSubList,
      subIndex,
      userAnswer,
      keyIndex,
      score,
    ]
  );

  // input focus
  useEffect(() => {
    userAnswerRef.current.focus();
  }, [onKeyDownHandler]);

  // score animation
  useEffect(() => {
    if (score !== 0) {
      scoreRef.current.style.animationPlayState = "running";
    }
    const scoreMoveStop = setTimeout(() => {
      scoreRef.current.style.animationPlayState = "paused";
    }, 2000);
    return () => clearTimeout(scoreMoveStop);
  }, [score]);

  return (
    <>
      <div className="Sub" ref={subRef}>
        <div className="subject-box">
          <div className="category">{quizSubList[subIndex]?.s_category}</div>
          <div>
            {quizSubList.length} 개의 주제 중 {subIndex + 1} 번째
          </div>
          <div className="subject">{quizSubList[subIndex]?.s_subject}</div>
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
            <IoArrowRedoCircleOutline />
            주제 건너뛰기
          </button>
        </div>
        <div className="total-score">
          <div ref={scoreRef}>
            <BsStarFill />
          </div>
          <div>
            <span>{score}</span> / {allKeyScore}
          </div>
        </div>

        <div className="feedback-msg" ref={feedbackRef}>
          {feedbackMsg === msgList.start ? (
            <BsStars />
          ) : feedbackMsg === msgList.correct ? (
            <BsCheck2Circle />
          ) : feedbackMsg === msgList.wrong ? (
            <BsDroplet />
          ) : (
            ""
          )}
          {feedbackMsg}
        </div>
        <div className="keyword-box">
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
            <IoArrowRedoCircleOutline />
            키워드 건너뛰기
          </button>
          <div className="keycount">
            <FaTags /> {keyIndex + 1} / {quizSubList[subIndex]?.s_keycount}
          </div>
          <div className="keyword-desc" ref={descRef}>
            {quizKeyList[keyIndex]?.k_desc}
          </div>
        </div>
        <section className="answer-box">
          <div className="msg-box" ref={msgInputRef}>
            <input
              className="msg"
              ref={userAnswerRef}
              placeholder="정답을 입력하세요!"
              value={userAnswer}
              onChange={(e) => {
                setUserAnswer(e.target.value);
              }}
              onKeyDown={(e) => {
                onKeyDownHandler(e);
              }}
            />
          </div>
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
