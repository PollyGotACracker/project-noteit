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
      <div
        className={
          item.t_deadline === moment().format("YYYY[-]MM[-]DD")
            ? "deadline active"
            : "deadline"
        }
      >
        {item.t_deadline}
      </div>
      <div className="prior">{item.t_prior}</div>
      <div className="complete" onClick={completeHandler}>
        &#x2713;
      </div>
    </div>
  );
};

export default TodoItem;
