import { useEffect, useRef } from "react";
import { BsStarFill } from "react-icons/bs";

const QuizGameScore = ({ score, perfectScore }) => {
  const scoreRef = useRef(null);

  const setScoreAnimation = (node, bool) => {
    const state = bool ? "running" : "paused";
    node.style.animationPlayState = state;
  };

  useEffect(() => {
    const scoreNode = scoreRef.current;
    if (score !== 0) {
      setScoreAnimation(scoreNode, true);
    }
    const scoreMoveStop = setTimeout(() => {
      setScoreAnimation(scoreNode, false);
    }, 2000);
    return () => clearTimeout(scoreMoveStop);
  }, [score]);

  return (
    <div className="total-score">
      <div ref={scoreRef}>
        <BsStarFill />
      </div>
      <div>
        <span>{score}</span> / {perfectScore}
      </div>
    </div>
  );
};

export default QuizGameScore;
