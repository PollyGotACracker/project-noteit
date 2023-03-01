import { useTodoContext } from "../../context/TodoContext";

const TodoInput = () => {
  const { todoInsert, todoContent, setTodoContent } = useTodoContext();

  const onClickHandler = () => {
    const t_content = todoContent.t_content;
    const t_deadline = todoContent.t_deadline;
    todoInsert(t_content, t_deadline);
  };

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTodoContent({ ...todoContent, [`${name}`]: value });
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
      <button>중요도 {todoContent.t_prior}</button>
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
