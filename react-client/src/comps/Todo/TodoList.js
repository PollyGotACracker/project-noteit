import { useLayoutEffect } from "react";
import { useUserContext } from "../../context/UserContext";
import { useTodoContext } from "../../context/TodoContext";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const { userData } = useUserContext();
  const { fetchAll, todoContentList } = useTodoContext();

  useLayoutEffect(() => {
    (async () => {
      if (userData?.u_userid !== "") await fetchAll(userData?.u_userid);
    })();
  }, [fetchAll, userData.u_userid]);

  const todoListItemView = todoContentList.map((item) => {
    return <TodoItem item={item} key={item.t_todoid} />;
  });

  return <section className="list">{todoListItemView}</section>;
};

export default TodoList;
