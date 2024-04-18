import style from "./form.module.css";
import { useEffect, useLayoutEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { useMutation } from "react-query";
import { userState } from "@recoils/user";
import { editState, todoState } from "../recoils/todo";
import useTodoFetcher from "../services/useTodoFetcher";
import useDropDown from "@hooks/useDropdown";
import cx from "classnames";

export default function Form() {
  const { upsertTodo } = useTodoFetcher();
  const userData = useRecoilValue(userState);
  const [todoItem, setTodoItem] = useRecoilState(todoState);
  const resetTodoItem = useResetRecoilState(todoState);
  const [isEdit, setIsEdit] = useRecoilState(editState);
  const [isDeadlineFilled, setIsDeadlineFilled] = useState(false);
  const { mutate: upsertMutation, data: upsertedData } = useMutation(
    upsertTodo()
  );

  useEffect(() => {
    if (upsertedData) resetTodoItem();
  }, [upsertedData]);

  useLayoutEffect(() => {
    if (todoItem.t_deadline !== "") {
      setIsDeadlineFilled(true);
    }
  }, [todoItem.t_deadline]);

  const handleSetTodo = ({ target }) => {
    const { name, value } = target;
    setTodoItem({
      ...todoItem,
      [`${name}`]: value,
    });
  };

  const handleTodoUpsert = () => {
    const todo = { ...todoItem };
    todo.t_userid = userData.u_userid;
    upsertMutation({ todo });
    setIsDeadlineFilled(false);
    if (isEdit) setIsEdit(false);
  };

  return (
    <form className={style.form}>
      <input
        placeholder="목표"
        className={style.content}
        name="t_content"
        onChange={handleSetTodo}
        value={todoItem.t_content}
      />
      <input
        className={cx(style.deadline, { [style.clear]: !isDeadlineFilled })}
        name="t_deadline"
        type="date"
        min="1900-01-01"
        max="2100-12-31"
        onChange={handleSetTodo}
        value={todoItem?.t_deadline}
        placeholder="마감일"
      />
      <Prior todoItem={todoItem} setTodoItem={setTodoItem} />
      <button
        type="button"
        className={style.submit}
        onClick={handleTodoUpsert}
        disabled={todoItem.t_content.length < 1}
      >
        {isEdit ? "수정" : "추가"}
      </button>
    </form>
  );
}

function Prior({ todoItem, setTodoItem }) {
  const [isPriorOpen, setIsPriorOpen, switchIsPriorOpen] = useDropDown();

  const handleSetPrior = (value) => {
    setTodoItem({ ...todoItem, t_prior: value });
    setIsPriorOpen(false);
  };

  return (
    <div className={cx(style.prior_wrapper, { [style.opened]: isPriorOpen })}>
      <button
        className={style.prior}
        data-prior={todoItem.t_prior}
        onClick={switchIsPriorOpen}
        type="button"
      >
        중요도
      </button>
      <div className={style.prior_option}>
        {[1, 2, 3, 4, 5].map((ele) => (
          <button
            type="button"
            key={ele}
            className={style.prior}
            data-prior={ele}
            onClick={() => handleSetPrior(ele)}
          >
            <span>{ele}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
