import style from "./todos.module.css";
import { MdChecklist } from "react-icons/md";
import NoContent from "@components/noContent/NoContent";
import TodoDeadline from "@components/todo/TodoDeadline";
import TodoPrior from "@components/todo/TodoPrior";

export default function Todos({ todos }) {
  const isNoData = todos?.length === 0;

  const list = todos?.map((item) => {
    return (
      <div className={style.item} key={item.t_todoid}>
        <div className={style.content}>{item.t_content}</div>
        <TodoDeadline deadline={item.t_deadline} />
        <TodoPrior prior={item.t_prior} />
      </div>
    );
  });

  return (
    <div className={style.todos}>
      <div className={style.title}>
        <MdChecklist />
        TODO
      </div>
      {isNoData ? (
        <NoContent msg={todos?.error || "새 목표를 추가해보세요!"} />
      ) : (
        list
      )}
    </div>
  );
}
