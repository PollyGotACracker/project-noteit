import { TodoContexProvider } from "../../context/TodoContext";
import "../../css/Todo/Todo.css";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

const TodoMain = () => {
  return (
    <main className="Todo">
      <TodoContexProvider>
        <TodoInput />
        <TodoList />
      </TodoContexProvider>
    </main>
  );
};

export default TodoMain;
