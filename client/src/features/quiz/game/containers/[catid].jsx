import style from "./page.module.css";
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

import { IoArrowRedoCircleOutline } from "react-icons/io5";
import { userState } from "@recoils/user";
import {
  subListState,
  keyListState,
  subIdxSelector,
  keyIdxSelector,
  keyListSelector,
  keyIdxState,
  subIdxState,
} from "../recoils/game";
import { initScore } from "../utils/initData";
import { URLS } from "@/router";
import feedback from "../constants/feedback";
import useGameFetcher from "../services/useGameFetcher";
import { getQuizTimer } from "../../common/utils/manageQuizTimerStorage";
import useQuizScore from "../hooks/useQuizScore";
import useQuizTimeout from "../hooks/useQuizTimeout";
import useQuizState from "../hooks/useQuizState";
import useQuizWrongList from "../hooks/useQuizWrongList";
import getDuration from "@utils/getDuration";
import Feedback from "../components/Feedback";
import Score from "../components/Score";
import Timer from "../components/Timer";
import Loading from "../components/Loading";
import Fallback from "@components/fallback/Fallback";

export default function QuizGame() {
  const { catid: catId } = useParams();
  const navigate = useNavigate();

  // element refs
  const gameRef = useRef(null);
  const userAnswerRef = useRef(null);

  // custom hooks
  const { getQuizRandom } = useGameFetcher();
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
  const [feedbackMsg, setFeedbackMsg] = useState(feedback.start);
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

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      if (userAnswer === "") return;
      let newScore = score;
      const isCorrect = checkQuizAnswer(userAnswer);
      if (isCorrect) {
        setFeedbackMsg(feedback.correct);
        newScore += 5;
      }
      if (!isCorrect) {
        setFeedbackMsg(feedback.wrong);
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
    }
  };

  const handleSkipSubject = () => {
    if (quizPaused || quizEnded) return;
    if (!isLastSubject) {
      setFeedbackMsg(feedback.nextSub);
      setNextSubIdx();
      setNextList();
      setFirstKeyIdx();
    }
    if (isLastSubject) {
      navigateResult({ jumped: true });
    }
    addWrongItem({ state: "nextSub" });
  };

  const handleSkipKeyword = () => {
    if (quizPaused || quizEnded) return;
    if (!isLastKeyword) {
      setFeedbackMsg(feedback.nextKey);
      setNextKeyIdx();
    }
    if (!isLastSubject && isLastKeyword) {
      setFeedbackMsg(feedback.nextSub);
      setNextSubIdx();
      setNextList();
      setFirstKeyIdx();
    }
    if (isLastSubject && isLastKeyword) {
      navigateResult({ jumped: true });
    }
    addWrongItem({ state: "nextKey" });
  };

  const handleTogglePaused = () => setQuizPaused(!quizPaused);

  // re-renders
  useEffect(() => {
    if (!userAnswerRef.current) return;
    setUserAnswer("");
    userAnswerRef.current.focus();
  }, [userAnswerRef.current, subIdx, keyIdx]);

  useEffect(() => {
    if (!userAnswerRef.current) return;
    if (!quizPaused) userAnswerRef.current.focus();
  }, [quizPaused]);

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
      {!isCountStart ? (
        <main className={style.main} ref={gameRef}>
          <Score score={score} perfectScore={perfectScore} />
          <div className={style.subject_box}>
            <div className={style.category}>
              {subjectList[subIdx]?.s_category}
            </div>
            <div>
              {subjectList?.length} 개의 주제 중 {subIdx + 1} 번째
            </div>
            <div className={style.subject}>
              {subjectList[subIdx]?.s_subject}
            </div>
            <button
              onClick={handleSkipSubject}
              disabled={quizPaused || quizEnded}
            >
              <IoArrowRedoCircleOutline />
              주제 건너뛰기
            </button>
          </div>
          <Feedback feedbackMsg={feedbackMsg} quizEnded={quizEnded} />
          <div className={style.keyword_box}>
            <button
              onClick={handleSkipKeyword}
              disabled={quizPaused || quizEnded}
            >
              <IoArrowRedoCircleOutline />
              키워드 건너뛰기
            </button>
            <div className={style.keycount}>
              <FaTags /> {keyIdx + 1} / {subjectList[subIdx]?.s_keycount}
            </div>
            <div className={style.keyword_description}>
              {!quizPaused
                ? keywordList[keyIdx]?.k_desc
                : "일시 중지 상태입니다."}
            </div>
          </div>
          <section className={style.answer_box}>
            <div className={style.message_box}>
              <input
                className={style.message}
                ref={userAnswerRef}
                placeholder={
                  !quizPaused
                    ? "정답을 입력하세요!"
                    : "이어하기 버튼을 누르세요!"
                }
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={onKeyDown}
                disabled={quizPaused || quizEnded}
              />
              {!!getQuizTimer() && (
                <button onClick={handleTogglePaused} disabled={quizEnded}>
                  {quizPaused ? "이어하기" : "일시중지"}
                </button>
              )}
            </div>
          </section>
          <Timer
            skipKeyFunc={handleSkipKeyword}
            quizPaused={quizPaused}
            setQuizPaused={setQuizPaused}
            quizEnded={quizEnded}
          />
        </main>
      ) : (
        <Loading />
      )}
    </Fallback>
  );
}
