import style from "./timer.module.css";
import {
  getQuizTimer,
  setQuizTimer,
} from "../../common/utils/manageQuizTimerStorage";

export default function Timer() {
  return (
    <div className={style.container}>
      <label htmlFor={style.timer}>
        타이머
        <input
          id={style.timer}
          className={style.translucent}
          type="number"
          defaultValue={getQuizTimer() || 0}
          step={10}
          min={0}
          onChange={(e) => setQuizTimer(e.target.value)}
        />
        초
      </label>
    </div>
  );
}
