import moment from "moment";
import { MdChecklist } from "react-icons/md";

const DashboardTodo = ({ todos }) => {
  if (!todos) return null;
  return (
    <div className="todos">
      <div className="title">
        <MdChecklist />
        TODO
      </div>
      {todos?.length !== 0 ? (
        <div>
          {todos?.map((item) => {
            const today = moment().format("YYYY[-]MM[-]DD");
            const isToday = item.t_deadline === today;
            const dDay =
              (new Date(today) - new Date(item.t_deadline)) /
              (1000 * 60 * 60 * 24);

            return (
              <div className="todo-item" key={item.t_todoid}>
                <div>{item.t_content}</div>
                <div className={isToday ? "deadline active" : "deadline"}>
                  {item.t_deadline}
                </div>
                <div className={isToday ? "deadline active" : "deadline"}>
                  {!item?.t_deadline
                    ? ""
                    : isToday
                    ? "D-day"
                    : `D${dDay > 0 ? "+" : ""}${dDay}`}
                </div>
                <div className="prior" data-prior={item.t_prior}></div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="todo-msg">{todos.error || "목표를 추가해보세요!"}</div>
      )}
    </div>
  );
};

export default DashboardTodo;
