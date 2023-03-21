import { useLayoutEffect, useState } from "react";
import moment from "moment";
import { useUserContext } from "../../context/UserContext";
import { MdChecklist } from "react-icons/md";

const BoardTodo = () => {
  const { userData } = useUserContext();
  const [todoList, setTodoList] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  useLayoutEffect(() => {
    (async () => {
      if (userData.u_userid !== "") {
        const todo = await fetch(`/${userData.u_userid}/todo`).then((data) =>
          data.json()
        );
        if (todo.error) {
          setErrMsg(todo.error);
          return false;
        } else setTodoList([...todo]);
      }
    })();
  }, [userData.u_userid]);

  return (
    <div className="todo">
      <div className="title">
        <MdChecklist />
        TODO
      </div>
      {todoList.map((item) => {
        const today = moment().format("YYYY[-]MM[-]DD");
        const isToday = item.t_deadline === today;
        const dDay =
          (new Date(today) - new Date(item.t_deadline)) / (1000 * 60 * 60 * 24);

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
  );
};

export default BoardTodo;
