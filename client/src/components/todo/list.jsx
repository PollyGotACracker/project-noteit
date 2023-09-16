import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useQuery } from "react-query";
import { todosState } from "@recoils/todo";
import { getTodos } from "@services/todo.service";
import ItemWrapper from "@components/todo/itemWrapper";
import Item from "@components/todo/item";

const TodoList = () => {
  const userId = "polly@gmail.com";
  const [todoList, setTodoList] = useRecoilState(todosState);
  const { data, isLoading } = useQuery(getTodos({ userId }));

  useEffect(() => {
    if (data) setTodoList([...data]);
  }, [data]);

  return (
    <ItemWrapper
      data={todoList}
      isLoading={isLoading}
      render={(props) => <Item item={props} />}
    />
  );
};

export default TodoList;
