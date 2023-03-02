import { TodoContextProvider } from "../../context/TodoContext";
import "../../css/Todo/Todo.css";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

const TodoMain = () => {
  return (
    <main className="Todo">
      <TodoContextProvider>
        <TodoInput />
        <TodoList />
      </TodoContextProvider>
    </main>
  );
};

export default TodoMain;
