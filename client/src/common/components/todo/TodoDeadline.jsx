import style from "./todoDeadline.module.css";
import moment from "moment";
import cx from "classnames";

export default function TodoDeadline({ deadline }) {
  const today = moment().format("YYYY[-]MM[-]DD");
  const isToday = deadline === today;
  const dDay = (new Date(today) - new Date(deadline)) / (1000 * 60 * 60 * 24);
  const deadlineClass = cx(style.deadline, { [style.active]: isToday });

  return (
    <>
      <div className={deadlineClass}>{deadline}</div>
      <div className={deadlineClass}>
        {!deadline ? "" : isToday ? "D-day" : `D${dDay > 0 ? "+" : ""}${dDay}`}
      </div>
    </>
  );
}
