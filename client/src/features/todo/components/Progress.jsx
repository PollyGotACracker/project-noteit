import style from "./progress.module.css";
import { useEffect, useLayoutEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { motion } from "framer-motion";
import { BsCheck2Circle } from "react-icons/bs";
import { todosState } from "../recoils/todo";

export default function Progress() {
  const todoList = useRecoilValue(todosState);
  const [completes, setCompletes] = useState(0);
  const [completeRatio, setCompleteRatio] = useState(0);

  useLayoutEffect(() => {
    setCompletes(todoList.filter((item) => item.t_compdate).length);
  }, [todoList]);

  useEffect(() => {
    if (todoList !== undefined) {
      let newRatio = (completes / todoList.length) * 100;
      if (isNaN(newRatio)) newRatio = 0;
      setCompleteRatio(newRatio);
    }
  }, [todoList, completes]);

  const motionProps = {
    initial: { width: "0%" },
    animate: { width: `${completeRatio}%` },
    transition: { duration: 0.5 },
  };

  return (
    <div className={style.progress}>
      <div className={style.ratio}>
        <BsCheck2Circle />
        {completes} / {todoList.length || 0}
      </div>
      <motion.div className={style.bar} {...motionProps} />
    </div>
  );
}
