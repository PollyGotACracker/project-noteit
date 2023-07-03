import { useEffect, createRef } from "react";
import { useUserContext } from "../../context/UserContext";
import { useTodoContext } from "../../context/TodoContext";
import useLoading from "../../hooks/useLoading";
import ListContainer from "../../components/ListContainer";
import ListItem from "../../components/ListItem";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const { userData } = useUserContext();
  const { fetchAll, todoContentList } = useTodoContext();
  const { isLoading, showContent } = useLoading();

  useEffect(() => {
    (async () => {
      userData?.u_userid && (await fetchAll(userData?.u_userid));
      todoContentList && showContent();
    })();
  }, []);

  const todoContent = todoContentList.map((item) => {
    const nodeRef = createRef(null);
    return (
      <ListItem key={item.t_todoid} nodeRef={nodeRef}>
        <TodoItem item={item} />
      </ListItem>
    );
  });

  return <ListContainer isLoading={isLoading}>{todoContent}</ListContainer>;
};

export default TodoList;
