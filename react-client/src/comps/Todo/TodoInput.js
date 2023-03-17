import { useTodoContext } from "../../context/TodoContext";
import { useState } from "react";

const TodoInput = () => {
  const { todoInsert, todoContent, setTodoContent, isEdit, setIsEdit } =
    useTodoContext();
  const [showPrior, setShowPrior] = useState(false);

  const onClickHandler = () => {
    todoInsert();
    if (isEdit === true) {
      setIsEdit(false);
    }
  };

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTodoContent({ ...todoContent, [`${name}`]: value });
  };

  const onChangePrior = (value) => {
    setTodoContent({ ...todoContent, t_prior: value });
    setShowPrior(false);
  };

  return (
    <div className="input">
      <input
        placeholder="목표"
        name="t_content"
        onChange={onChangeHandler}
        value={todoContent.t_content}
      />
      <input
        type="date"
        name="t_deadline"
        onChange={onChangeHandler}
        value={todoContent.t_deadline}
        data-placeholder="마감일"
      />
      <div
        className="prior-wrap"
        onClick={() => {
          setShowPrior(!showPrior);
        }}
      >
        <div className="prior-value" data-prior={todoContent.t_prior}>
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
                onChangePrior(ele);
              }}
            >
              <span>{ele}</span>
            </button>
          ))}
        </div>
      </div>
      <button
        className="submit"
        onClick={onClickHandler}
        disabled={todoContent.t_content.length < 1}
      >
        {isEdit ? "수정" : "추가"}
      </button>
    </div>
  );
};

export default TodoInput;
