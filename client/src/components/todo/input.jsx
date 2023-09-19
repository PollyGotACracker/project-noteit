import { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { useMutation } from "react-query";
import { editState, todoState } from "@recoils/todo";
import { getClient } from "@services/core";
import { upsertTodo } from "@services/todo.service";

const TodoInput = () => {
  const userId = "polly@gmail.com";
  const queryClient = getClient();
  const [todoItem, setTodoItem] = useRecoilState(todoState);
  const resetTodoItem = useResetRecoilState(todoState);
  const [isEdit, setIsEdit] = useRecoilState(editState);
  const [showPrior, setShowPrior] = useState(false);

  const { mutate: upsertMutation, data: upsertedData } = useMutation(
    upsertTodo({ queryClient, userId })
  );

  useEffect(() => {
    if (upsertedData) resetTodoItem();
  }, [upsertedData]);

  const changeValueHandler = ({ target }) => {
    const { name, value } = target;
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
    todo.t_userid = userId;
    upsertMutation({ todo });
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
        className={
          todoItem?.t_deadline !== "" ? "t_deadline" : "t_deadline empty"
        }
        name="t_deadline"
        onChange={changeValueHandler}
        value={todoItem?.t_deadline}
        data-placeholder="마감일"
      />
      <div className="prior-wrap" onClick={() => setShowPrior(!showPrior)}>
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
              onClick={() => {
                changePriorHandler(ele);
                setShowPrior(false);
              }}
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
