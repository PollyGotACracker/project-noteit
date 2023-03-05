import { TodoContextProvider } from "../../context/TodoContext";
import "../../css/Todo/Todo.css";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

const TodoMain = () => {
  return (
    <article className="Todo">
      <TodoContextProvider>
        <TodoInput />
        <TodoList />
      </TodoContextProvider>
    </article>
  );
};

export default TodoMain;
