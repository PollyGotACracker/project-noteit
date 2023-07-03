import { useEffect } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { useTodoContext } from "../../contexts/TodoContext";
import useLoading from "../../hooks/useLoading";
import List from "../../components/List";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const { userData } = useUserContext();
  const { getTodoList, todoList } = useTodoContext();
  const { isLoading, showContent } = useLoading();

  useEffect(() => {
    (async () => {
      userData?.u_userid && (await getTodoList(userData?.u_userid));
      todoList && showContent();
    })();
  }, [userData?.u_userid]);

  return (
    <List
      data={todoList}
      isLoading={isLoading}
      render={(props) => <TodoItem item={props} />}
    />
  );
};

export default TodoList;
