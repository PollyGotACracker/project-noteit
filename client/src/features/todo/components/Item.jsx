import style from "./item.module.css";
import { useSetRecoilState } from "recoil";
import { useMutation } from "react-query";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { editState, todoState } from "../recoils/todo";
import useTodoFetcher from "../services/useTodoFetcher";
import useModals from "@hooks/useModals";
import TodoDeadline from "@components/todo/TodoDeadline";
import TodoPrior from "@components/todo/TodoPrior";
import cx from "classnames";

export default function Item({ item }) {
  const { openModal } = useModals();
  const { deleteTodo, updateTodoComplete } = useTodoFetcher();
  const todoId = item.t_todoid;
  const setTodoItem = useSetRecoilState(todoState);
  const setIsEdit = useSetRecoilState(editState);
  const { mutate: deleteMutation } = useMutation(deleteTodo());
  const { mutate: updateCompleteMutation } = useMutation(updateTodoComplete());

  const handleComplete = () => {
    updateCompleteMutation({ todoId });
  };

  const handleEdit = () => {
    setTodoItem({ ...item });
    setIsEdit(true);
  };

  const handleDelete = () => {
    openModal({
      content: `${item.t_content}\n이 목표를 삭제할까요?`,
      okClick: () => {
        deleteMutation({ todoId });
      },
    });
  };

  return (
    <div className={style.item} data-id={todoId}>
      <div className={style.complete} onClick={handleComplete}>
        <AiOutlineCheck />
      </div>
      <div className={style.date}>
        <div>{item.t_date}</div>
        <div>{item.t_time}</div>
      </div>
      <div
        className={cx(style.content, { [style.completed]: item.t_compdate })}
        onClick={handleEdit}
        title="수정"
      >
        {item.t_content}
      </div>
      <TodoDeadline deadline={item.t_deadline} />
      <TodoPrior prior={item.t_prior} />
      <div className={style.delete} onClick={handleDelete}>
        <AiOutlineClose />
      </div>
    </div>
  );
}
