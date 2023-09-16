import "@styles/todo.css";
import Input from "@components/todo/input";
import List from "@components/todo/list";

const TodoPage = () => {
  return (
    <article className="Todo">
      <Input />
      <List />
    </article>
  );
};

export default TodoPage;
