import { useTodoContext } from "../../context/TodoContext";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const { todoContentList } = useTodoContext();

  const todoListItemView = todoContentList.map((item) => {
    return <TodoItem item={item} key={item.t_todoid} />;
  });

  return <section className="list">{todoListItemView}</section>;
};

export default TodoList;
