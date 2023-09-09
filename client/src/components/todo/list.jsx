import { useEffect } from "react";
import { useUserContext } from "@contexts/userContext";
import { useTodoContext } from "@contexts/todoContext";
import useLoading from "@hooks/useLoading";
import ItemWrapper from "@components/todo/itemWrapper";
import Item from "@components/todo/item";

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
    <ItemWrapper
      data={todoList}
      isLoading={isLoading}
      render={(props) => <Item item={props} />}
    />
  );
};

export default TodoList;
