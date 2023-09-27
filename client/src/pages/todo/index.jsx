import "@styles/todo/todo.css";
import Progress from "@components/todo/progress";
import Input from "@components/todo/input";
import List from "@components/todo/list";

const TodoPage = () => {
  return (
    <main className="Todo">
      <Progress />
      <Input />
      <List />
    </main>
  );
};

export default TodoPage;
