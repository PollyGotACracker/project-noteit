import { useEffect, useState, useRef } from "react";
import { useRecoilValue } from "recoil";
import { keyIdxState, subIdxState } from "@recoils/quiz";
import useTimer from "@hooks/useTimer";
import { getQuizTimer } from "@utils/manageQuizTimerStorage";

const GameTimer = ({ skipKeyFunc, quizPaused, setQuizPaused, quizEnded }) => {
  const seconds = getQuizTimer();
  const { count, startTimer, pauseTimer, clearTimer } = useTimer(seconds);
  const [quizStarted, setQuizStarted] = useState(false);
  const barRef = useRef(null);
  const pausedFlag = useRef(false);
  const subIndex = useRecoilValue(subIdxState);
  const keyIndex = useRecoilValue(keyIdxState);

  useEffect(() => {
    if (!!!seconds) return;
    setQuizStarted(false);
  }, [seconds, subIndex, keyIndex]);

  useEffect(() => {
    if (!!!seconds) return;
    if (count === 0) skipKeyFunc();
  }, [seconds, count]);

  useEffect(() => {
    if (quizStarted) return;
    clearTimer();
    startTimer();
    setQuizPaused(false);
    setQuizStarted(true);
  }, [quizStarted]);

  useEffect(() => {
    if (!barRef.current) return;
    if (quizPaused && !pausedFlag.current) {
      pauseTimer();
      barRef.current.style.animationPlayState = "paused";
      pausedFlag.current = true;
    }
    if (!quizPaused && pausedFlag.current) {
      startTimer();
      barRef.current.style.animationPlayState = "running";
      pausedFlag.current = false;
    }
  }, [quizPaused, barRef.current, pausedFlag.current]);

  useEffect(() => {
    if (quizEnded) {
      clearTimer();
      barRef.current.style.animationPlayState = "paused";
    }
  }, [quizEnded]);

  if (!!!seconds) return <></>;
  return (
    <div key={`${subIndex} ${keyIndex}`} className="timer-container">
      <div
        ref={barRef}
        className="timer-bar"
        style={{
          animationDuration: `${seconds}s, ${seconds}s`,
        }}
      ></div>
    </div>
  );
};

export default GameTimer;
