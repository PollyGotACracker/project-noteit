import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { useMutation } from "react-query";
import { userState } from "@recoils/user";
import { editState, todoState } from "@recoils/todo";
import useTodoFetcher from "@services/useTodoFetcher";

const TodoInput = () => {
  const { upsertTodo } = useTodoFetcher();
  const userData = useRecoilValue(userState);
  const [todoItem, setTodoItem] = useRecoilState(todoState);
  const resetTodoItem = useResetRecoilState(todoState);
  const [isEdit, setIsEdit] = useRecoilState(editState);
  const [showPrior, setShowPrior] = useState(false);
  const [isDeadlineFilled, setIsDeadlineFilled] = useState(false);
  const { mutate: upsertMutation, data: upsertedData } = useMutation(
    upsertTodo()
  );

  useEffect(() => {
    const closePriorBox = () => setShowPrior(false);
    document.body.addEventListener("click", closePriorBox);
    return () => {
      document.body.removeEventListener("click", closePriorBox);
    };
  }, []);

  useEffect(() => {
    if (upsertedData) resetTodoItem();
  }, [upsertedData]);

  const changePriorBoxState = (e) => {
    e.stopPropagation();
    setShowPrior(!showPrior);
  };

  const changePriorValue = (num) => {
    changePriorHandler(num);
    setShowPrior(false);
  };

  const changeValueHandler = ({ target }) => {
    const { name, value } = target;
    if (name === "t_deadline") {
      const isFilled = value !== "";
      setIsDeadlineFilled(isFilled);
    }
    setTodoItem({
      ...todoItem,
      [`${name}`]: value,
    });
  };

  const changePriorHandler = (value) => {
    setTodoItem({ ...todoItem, t_prior: value });
  };

  const todoUpsertHandler = () => {
    const todo = { ...todoItem };
    todo.t_userid = userData.u_userid;
    upsertMutation({ todo });
    setIsDeadlineFilled(false);
    if (isEdit) setIsEdit(false);
  };

  return (
    <div className="input">
      <input
        placeholder="목표"
        className="t_content"
        name="t_content"
        onChange={changeValueHandler}
        value={todoItem.t_content}
      />
      <input
        type="date"
        className={isDeadlineFilled ? "t_deadline" : "t_deadline clear"}
        name="t_deadline"
        min="1900-01-01"
        max="2100-12-31"
        onChange={changeValueHandler}
        value={todoItem?.t_deadline}
        placeholder="마감일"
      />
      <div className="prior-wrap" onClick={changePriorBoxState}>
        <div className="prior-value" data-prior={todoItem.t_prior}>
          중요도
        </div>
        <div
          className="prior-option"
          style={{ display: showPrior ? "flex" : "none" }}
        >
          {[1, 2, 3, 4, 5].map((ele) => (
            <button
              key={ele}
              data-prior={ele}
              onClick={() => changePriorValue(ele)}
            >
              <span>{ele}</span>
            </button>
          ))}
        </div>
      </div>
      <button
        className="submit"
        onClick={todoUpsertHandler}
        disabled={todoItem.t_content.length < 1}
      >
        {isEdit ? "수정" : "추가"}
      </button>
    </div>
  );
};

export default TodoInput;
