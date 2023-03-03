import { useTodoContext } from "../../context/TodoContext";
import { useState } from "react";

const TodoInput = () => {
  const { todoInsert, todoContent, setTodoContent } = useTodoContext();
  const [showPrior, setShowPrior] = useState(false);

  const onClickHandler = () => {
    todoInsert();
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
        placeholder="TODO"
        name="t_content"
        onChange={onChangeHandler}
        value={todoContent.t_content}
      />
      <input
        type="date"
        name="t_deadline"
        onChange={onChangeHandler}
        value={todoContent.t_deadline}
      />
      <div className="prior-wrap">
        <button
          onClick={() => {
            setShowPrior(!showPrior);
          }}
        >
          중요도 {todoContent.t_prior}
        </button>
        <div
          className="prior-option"
          style={{ display: showPrior ? "flex" : "none" }}
        >
          {[1, 2, 3, 4, 5].map((ele) => (
            <button
              key={ele}
              onClick={() => {
                onChangePrior(ele);
              }}
            >
              {ele}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={onClickHandler}
        disabled={todoContent.t_content.length < 2}
      >
        Enter
      </button>
    </div>
  );
};

export default TodoInput;
