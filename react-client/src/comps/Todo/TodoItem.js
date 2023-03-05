import { useTodoContext } from "../../context/TodoContext";
import { useCallback } from "react";
import moment from "moment";

const TodoItem = ({ item }) => {
  const { todoDelete, todoComplete, todoEditor } = useTodoContext();

  const deleteHandler = useCallback(
    (e) => {
      const target = e.target;
      const parent = target.closest("DIV.item");
      const uid = parent.dataset.id;
      const childDiv = parent.childNodes;
      const content = childDiv[2].textContent;
      if (window.confirm(`"${content}"\n할일 아이템을 삭제합니다.`)) {
        todoDelete(uid);
      }
    },
    [todoDelete]
  );

  const completeHandler = (e) => {
    const target = e.target;
    const uid = target.closest("DIV.item").dataset.id;
    todoComplete(uid);
  };

  const editorHandler = (e) => {
    const target = e.target;
    const parent = target.closest("DIV.item");
    const uid = parent.dataset.id;
    todoEditor(uid);
  };

  const today = moment().format("YYYY[-]MM[-]DD");
  const isToday = item.t_deadline === today;
  const dDay =
    (new Date(today) - new Date(item.t_deadline)) / (1000 * 60 * 60 * 24);

  return (
    <div className="item" data-id={item.t_todoid}>
      <div className="delete" onClick={deleteHandler}>
        &times;
      </div>
      <div className="date">
        <div>{item.t_date}</div>
        <div>{item.t_time}</div>
      </div>
      <div
        className={item.t_compdate ? "content line" : "content"}
        onClick={editorHandler}
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
      <div className="prior">{item.t_prior}</div>
      <div className="complete" onClick={completeHandler}>
        &#x2713;
      </div>
    </div>
  );
};

export default TodoItem;