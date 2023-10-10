import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import { userState } from "@recoils/user";
import { todosState } from "@recoils/todo";
import useTodoFetcher from "@services/useTodoFetcher";
import ItemWrapper from "@components/todo/itemWrapper";

const TodoList = () => {
  const { getTodos } = useTodoFetcher();
  const userData = useRecoilValue(userState);
  const [todoList, setTodoList] = useRecoilState(todosState);
  const { data } = useQuery(getTodos({ userId: userData.u_userid }));

  useEffect(() => {
    if (data) setTodoList([...data]);
  }, [data]);

  return <ItemWrapper data={todoList} />;
};

export default TodoList;
