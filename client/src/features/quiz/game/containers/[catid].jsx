import style from "./page.module.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import { FaTags } from "react-icons/fa";
import { IoArrowRedoCircleOutline } from "react-icons/io5";
import { userState } from "@recoils/user";
import { subIndexState, keyIndexState } from "../recoils/game";
import { initScore } from "../utils/initData";
import { URLS } from "@/router";
import feedback from "../constants/feedback";
import useGameFetcher from "../services/useGameFetcher";
import { getQuizTimer } from "../../common/utils/manageQuizTimerStorage";
import useQuizScore from "../hooks/useQuizScore";
import useQuizTimeout from "../hooks/useQuizTimeout";
import useQuizData from "../hooks/useQuizData";
import useQuizIndex from "../hooks/useQuizIndex";
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

  // fetch data
  const { getQuizRandom } = useGameFetcher();
  const { data = [], isLoading } = useQuery(getQuizRandom({ catId }));

  // quiz states / helpers
  const [quizPaused, setQuizPaused] = useState(false);
  const [quizEnded, setQuizEnded] = useState(false);
  const subIndex = useRecoilValue(subIndexState);
  const keyIndex = useRecoilValue(keyIndexState);
  const { setNextSubject, setNextKeyword } = useQuizIndex({
    data,
  });
  const { actionType, updateQuizData, getWrongData } = useQuizData({ data });
  const { countDown, setCounter, isCountStart } = useQuizTimeout({
    gameRef,
    userAnswerRef,
  });

  // quiz result / helpers
  const userData = useRecoilValue(userState);
  const [userScore, setUserScore] = useState(initScore);
  const [score, setScore] = useState(0);
  const { perfectScore, checkQuizAnswer } = useQuizScore({ data });
  const [feedbackMsg, setFeedbackMsg] = useState(feedback.start);

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
        sc_category: data[0].s_category,
        sc_catid: data[0].s_catid,
        sc_score: finalScore,
        sc_totalscore: perfectScore,
        sc_duration: `${duration.HH}:${duration.mm}:${duration.ss}`,
        sc_userid: userData.u_userid,
      };
    });
    setCounter(jumped);
  };

  const onKeyDown = (e) => {
    const userAnswer = e.target.value;
    if (e.keyCode !== 13 || userAnswer.trim() === "") return;

    let newScore = score;
    const isCorrect = checkQuizAnswer(userAnswer);
    if (isCorrect) {
      setFeedbackMsg(feedback.correct);
      newScore += 5;
      updateQuizData({ type: actionType.CORRECT, userAnswer });
    }
    if (!isCorrect) {
      setFeedbackMsg(feedback.wrong);
      updateQuizData({ type: actionType.WRONG, userAnswer });
    }
    setScore(newScore);

    const hasNext = setNextKeyword();
    if (!hasNext) {
      navigateResult({ finalScore: newScore });
    }
  };

  const handleSkipSubject = () => {
    if (quizPaused || quizEnded) return;
    const feedback = setNextSubject();
    if (feedback) {
      setFeedbackMsg(feedback);
    } else {
      navigateResult({ jumped: true });
    }
    updateQuizData({ type: actionType.SKIP_SUB });
  };

  const handleSkipKeyword = () => {
    if (quizPaused || quizEnded) return;
    const feedback = setNextKeyword();
    if (feedback) {
      setFeedbackMsg(feedback);
    } else {
      navigateResult({ jumped: true });
    }
    updateQuizData({ type: actionType.SKIP_KEY });
  };

  const handleTogglePaused = () => setQuizPaused(!quizPaused);

  // side effects
  useEffect(() => {
    if (!userAnswerRef.current) return;
    userAnswerRef.current.value = "";
    userAnswerRef.current.focus();
  }, [userAnswerRef.current, subIndex, keyIndex]);

  useEffect(() => {
    if (!userAnswerRef.current) return;
    if (!quizPaused) userAnswerRef.current.focus();
  }, [quizPaused]);

  useEffect(() => {
    if (countDown < 0) {
      navigate(URLS.QUIZ_RESULT, {
        state: {
          data: getWrongData(),
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
            <div className={style.category}>{data[subIndex]?.s_category}</div>
            <div>
              {data?.length} 개의 주제 중 {subIndex + 1} 번째
            </div>
            <div className={style.subject}>{data[subIndex]?.s_subject}</div>
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
              <FaTags /> {keyIndex + 1} / {data[subIndex]?.s_keycount}
            </div>
            <div className={style.keyword_description}>
              {!quizPaused
                ? data[subIndex]?.tbl_keywords[keyIndex]?.k_desc
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
