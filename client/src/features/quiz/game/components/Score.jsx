import style from "./score.module.css";
import { useEffect, useRef } from "react";
import { BsStarFill } from "react-icons/bs";

export default function Score({ score, perfectScore }) {
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
    <div className={style.score_box}>
      <div ref={scoreRef} className={style.score_star}>
        <BsStarFill />
      </div>
      <div>
        <span>{score}</span> / {perfectScore}
      </div>
    </div>
  );
}
