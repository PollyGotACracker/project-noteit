import style from "./feedback.module.css";
import { useRef, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { BsCheck2Circle, BsDroplet, BsStars } from "react-icons/bs";
import feedback from "../constants/feedback";
import { subIdxState, keyIdxState } from "../recoils/game";

export default function Feedback({ feedbackMsg, quizEnded }) {
  const subIndex = useRecoilValue(subIdxState);
  const keyIndex = useRecoilValue(keyIdxState);
  const msgMoveStop = useRef(null);
  const feedbackRef = useRef(null);

  const setAnimation = (node, result) => {
    const isCorrect = result === "correct";
    const isWrong = result === "wrong";
    const name = isCorrect ? "jumpMsg" : isWrong ? "shakeMsg" : "";
    node.style.animationName = name;
  };

  const setPlayState = (node, bool) => {
    const state = bool ? "running" : "paused";
    const opacity = bool ? "1" : "0";
    node.style.animationPlayState = state;
    node.style.opacity = opacity;
    if (!bool) node.style.animationName = "";
  };

  useEffect(() => {
    if (msgMoveStop.current) {
      clearTimeout(msgMoveStop.current);
    }

    const feedbackNode = feedbackRef.current;
    setPlayState(feedbackNode, true);
    if (feedbackMsg === feedback.correct) {
      setAnimation(feedbackNode, "correct");
    }
    if (feedbackMsg === feedback.wrong) {
      setAnimation(feedbackNode, "wrong");
    }

    msgMoveStop.current = setTimeout(() => {
      setPlayState(feedbackNode, false);
    }, 2400);

    return () => {
      if (msgMoveStop.current) {
        clearTimeout(msgMoveStop.current);
      }
    };
  }, [subIndex, keyIndex, quizEnded, feedbackMsg]);

  return (
    <div ref={feedbackRef} className={style.feedback}>
      {feedbackMsg === feedback.start ? (
        <BsStars />
      ) : feedbackMsg === feedback.correct ? (
        <BsCheck2Circle />
      ) : feedbackMsg === feedback.wrong ? (
        <BsDroplet />
      ) : (
        ""
      )}
      {feedbackMsg}
    </div>
  );
}
