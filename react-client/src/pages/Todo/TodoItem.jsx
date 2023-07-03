import React from "react";
import moment from "moment";
import { useTodoContext } from "../../contexts/TodoContext";
import { useUserContext } from "../../contexts/UserContext";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";

const TodoItem = ({ item }) => {
  const { completeHandler, editHandler, deleteHandler } = useTodoContext();
  const { userData } = useUserContext();

  const today = moment().format("YYYY[-]MM[-]DD");
  const isToday = item.t_deadline === today;
  const dDay =
    (new Date(today) - new Date(item.t_deadline)) / (1000 * 60 * 60 * 24);

  return (
    <div className="item" data-id={item.t_todoid}>
      <div className="complete" onClick={(e) => completeHandler(e, userData)}>
        <AiOutlineCheck />
      </div>
      <div className="date">
        <div>{item.t_date}</div>
        <div>{item.t_time}</div>
      </div>
      <div
        className={item.t_compdate ? "content line" : "content"}
        onClick={(e) => editHandler(e)}
        title="수정"
      >
        {item.t_content}
      </div>
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
      <div className="delete" onClick={(e) => deleteHandler(e, userData)}>
        <AiOutlineClose />
      </div>
    </div>
  );
};

export default React.memo(TodoItem);
