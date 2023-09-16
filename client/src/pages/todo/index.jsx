import "@styles/todo.css";
import Progress from "@components/todo/progress";
import Input from "@components/todo/input";
import List from "@components/todo/list";

const TodoPage = () => {
  return (
    <article className="Todo">
      <Progress />
      <Input />
      <List />
    </article>
  );
};

export default TodoPage;
