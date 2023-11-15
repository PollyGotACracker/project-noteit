import "@styles/quiz/game.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { useQuery } from "react-query";
import { FaTags } from "react-icons/fa";
import { IoIosHourglass } from "react-icons/io";
import { IoArrowRedoCircleOutline } from "react-icons/io5";
import { userState } from "@recoils/user";
import {
  initScore,
  subListState,
  keyListState,
  subIdxSelector,
  keyIdxSelector,
  keyListSelector,
  keyIdxState,
  subIdxState,
} from "@recoils/quiz";
import { URLS } from "@/router";
import { feedbackMsgList } from "@data/quiz";
import useQuizFetcher from "@services/useQuizFetcher";
import { getQuizTimer } from "@utils/manageQuizTimerStorage";
import useQuizScore from "@hooks/useQuizScore";
import useQuizTimeout from "@hooks/useQuizTimeout";
import useQuizState from "@hooks/useQuizState";
import useQuizWrongList from "@hooks/useQuizWrongList";
import getDuration from "@utils/getDuration";
import Feedback from "@components/quiz/gameFeedback";
import Score from "@components/quiz/gameScore";
import GameTimer from "@components/quiz/gameTimer";
import Fallback from "@components/fallback";

const QuizGamePage = () => {
  const { catid: catId } = useParams();
  const navigate = useNavigate();

  // element refs
  const gameRef = useRef(null);
  const userAnswerRef = useRef(null);
  const msgInputRef = useRef(null);

  // custom hooks
  const { getQuizRandom } = useQuizFetcher();
  const { perfectScore, checkQuizAnswer } = useQuizScore();
  const { wrongAnswer, addWrongItem } = useQuizWrongList();
  const { isLastSubject, isLastKeyword } = useQuizState();
  const { countDown, setCounter, isCountStart } = useQuizTimeout({
    gameRef,
    userAnswerRef,
  });

  // fetch data
  const { data, isLoading } = useQuery(getQuizRandom({ catId }));

  // states
  const userData = useRecoilValue(userState);
  const [userScore, setUserScore] = useState(initScore);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [quizPaused, setQuizPaused] = useState(false);
  const [quizEnded, setQuizEnded] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState(feedbackMsgList.start);
  const [subjectList, setSubjectList] = useRecoilState(subListState);
  const setKeywordList = useSetRecoilState(keyListState);
  const [keywordList, setNextList] = useRecoilState(keyListSelector);
  const [subIdx, setNextSubIdx] = useRecoilState(subIdxSelector);
  const [keyIdx, setNextKeyIdx] = useRecoilState(keyIdxSelector);
  const setFirstSubIdx = useResetRecoilState(subIdxState);
  const setFirstKeyIdx = useResetRecoilState(keyIdxState);

  // functions
  const navigateResult = ({ finalScore = score, jumped = false }) => {
    setQuizEnded(true);
    const duration = getDuration({
      date: userScore.sc_date,
      time: userScore.sc_time,
    });
    setUserScore((prev) => {
      return {
        ...prev,
        sc_category: subjectList[0].s_category,
        sc_catid: subjectList[0].s_catid,
        sc_score: finalScore,
        sc_totalscore: perfectScore,
        sc_duration: `${duration.HH}:${duration.mm}:${duration.ss}`,
        sc_userid: userData.u_userid,
      };
    });
    setCounter(jumped);
  };

  const onKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      if (userAnswer === "") return;
      let newScore = score;
      const isCorrect = checkQuizAnswer(userAnswer);
      if (isCorrect) {
        setFeedbackMsg(feedbackMsgList.correct);
        newScore += 5;
      }
      if (!isCorrect) {
        setFeedbackMsg(feedbackMsgList.wrong);
        addWrongItem({ state: "wrong", answer: userAnswer });
      }
      setScore(newScore);

      if (!isLastKeyword) {
        setNextKeyIdx();
      }
      if (isLastKeyword && !isLastSubject) {
        setNextSubIdx();
        setNextList();
        setFirstKeyIdx();
      }
      if (isLastKeyword && isLastSubject) {
        navigateResult({ finalScore: newScore });
      }

      resetAnswerInput();
    }
  };

  const skipSubjectHandler = () => {
    if (!isLastSubject) {
      setFeedbackMsg(feedbackMsgList.nextSub);
      setNextSubIdx();
      setNextList();
      setFirstKeyIdx();
    }
    if (isLastSubject) {
      navigateResult({ jumped: true });
    }
    addWrongItem({ state: "nextSub" });
    resetAnswerInput();
  };

  const skipKeywordHandler = () => {
    if (!isLastKeyword) {
      setFeedbackMsg(feedbackMsgList.nextKey);
      setNextKeyIdx();
    }
    if (!isLastSubject && isLastKeyword) {
      setFeedbackMsg(feedbackMsgList.nextSub);
      setNextSubIdx();
      setNextList();
      setFirstKeyIdx();
    }
    if (isLastSubject && isLastKeyword) {
      navigateResult({ jumped: true });
    }
    addWrongItem({ state: "nextKey" });
    resetAnswerInput();
  };

  const togglePausedState = () => setQuizPaused(!quizPaused);

  const resetAnswerInput = () => {
    setUserAnswer("");
    userAnswerRef.current.focus();
  };

  // re-renders
  useEffect(() => {
    if (userAnswerRef.current) resetAnswerInput();
  }, [userAnswerRef.current]);

  useEffect(() => {
    if (data) {
      setSubjectList([...data]);
      setKeywordList([...data[0].tbl_keywords]);
    }
    return () => {
      setFirstSubIdx();
      setFirstKeyIdx();
    };
  }, [data]);

  useEffect(() => {
    if (countDown < 0) {
      navigate(URLS.QUIZ_RESULT, {
        state: {
          wrongs: wrongAnswer,
          score: userScore,
        },
        replace: true,
      });
    }
  }, [countDown]);

  return (
    <Fallback isLoading={isLoading}>
      <main className="Quiz">
        {!isCountStart ? (
          <div className="Game" ref={gameRef}>
            <Score score={score} perfectScore={perfectScore} />
            <div className="subject-box">
              <div className="category">{subjectList[subIdx]?.s_category}</div>
              <div>
                {subjectList?.length} 개의 주제 중 {subIdx + 1} 번째
              </div>
              <div className="subject">{subjectList[subIdx]?.s_subject}</div>
              <button onClick={skipSubjectHandler}>
                <IoArrowRedoCircleOutline />
                주제 건너뛰기
              </button>
            </div>
            <Feedback feedbackMsg={feedbackMsg} />
            <div className="keyword-box">
              <button onClick={skipKeywordHandler}>
                <IoArrowRedoCircleOutline />
                키워드 건너뛰기
              </button>
              <div className="keycount">
                <FaTags /> {keyIdx + 1} / {subjectList[subIdx]?.s_keycount}
              </div>
              <div className="keyword-desc">{keywordList[keyIdx]?.k_desc}</div>
            </div>
            <section className="answer-box">
              <div className="msg-box" ref={msgInputRef}>
                <input
                  className="msg"
                  ref={userAnswerRef}
                  placeholder="정답을 입력하세요!"
                  value={userAnswer}
                  onChange={({ target: { value } }) => setUserAnswer(value)}
                  onKeyDown={onKeyDownHandler}
                />
                {!!getQuizTimer() && (
                  <button onClick={togglePausedState}>
                    {quizPaused ? "이어하기" : "일시중지"}
                  </button>
                )}
              </div>
            </section>
            <GameTimer
              skipKeyFunc={skipKeywordHandler}
              quizPaused={quizPaused}
              setQuizPaused={setQuizPaused}
              quizEnded={quizEnded}
            />
          </div>
        ) : (
          <section className="loading">
            <IoIosHourglass />
            <span>점수 계산 중...</span>
          </section>
        )}
      </main>
    </Fallback>
  );
};

export default QuizGamePage;
