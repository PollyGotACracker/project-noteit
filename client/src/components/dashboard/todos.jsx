import "@styles/dashboard/todos.css";
import moment from "moment";
import { MdChecklist } from "react-icons/md";

const DashboardTodos = ({ todos }) => {
  const isNoData = todos?.length === 0;
  const today = moment().format("YYYY[-]MM[-]DD");

  const noData = (
    <div className="todos-msg">{todos?.error || "목표를 추가해보세요!"}</div>
  );

  const data = todos?.map((item) => {
    const isToday = item.t_deadline === today;
    const dDay =
      (new Date(today) - new Date(item.t_deadline)) / (1000 * 60 * 60 * 24);
    const deadlineClass = isToday ? "deadline active" : "deadline";

    return (
      <div className="todos-item" key={item.t_todoid}>
        <div>{item.t_content}</div>
        <div className={deadlineClass}>{item.t_deadline}</div>
        <div className={deadlineClass}>
          {!item?.t_deadline
            ? ""
            : isToday
            ? "D-day"
            : `D${dDay > 0 ? "+" : ""}${dDay}`}
        </div>
        <div className="prior" data-prior={item.t_prior}></div>
      </div>
    );
  });

  return (
    <div className="todos">
      <div className="title">
        <MdChecklist />
        TODO
      </div>
      {isNoData ? noData : data}
    </div>
  );
};

export default DashboardTodos;
