import { TodoContextProvider } from "@contexts/todoContext";
import "@styles/todo.css";
import Input from "@components/todo/input";
import List from "@components/todo/list";

const TodoPage = () => {
  return (
    <article className="Todo">
      <TodoContextProvider>
        <Input />
        <List />
      </TodoContextProvider>
    </article>
  );
};

export default TodoPage;
