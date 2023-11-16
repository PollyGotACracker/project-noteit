import { useRef, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { BsCheck2Circle, BsDroplet, BsStars } from "react-icons/bs";
import { feedbackMsgList } from "@data/quiz";
import { subIdxState, keyIdxState } from "@recoils/quiz";

const QuizGameFeedback = ({ feedbackMsg, quizEnded }) => {
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
    if (feedbackMsg === feedbackMsgList.correct) {
      setAnimation(feedbackNode, "correct");
    }
    if (feedbackMsg === feedbackMsgList.wrong) {
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
    <div ref={feedbackRef} className="feedback-msg">
      {feedbackMsg === feedbackMsgList.start ? (
        <BsStars />
      ) : feedbackMsg === feedbackMsgList.correct ? (
        <BsCheck2Circle />
      ) : feedbackMsg === feedbackMsgList.wrong ? (
        <BsDroplet />
      ) : (
        ""
      )}
      {feedbackMsg}
    </div>
  );
};

export default QuizGameFeedback;
