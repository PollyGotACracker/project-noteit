import { createContext, useContext, useState, useCallback } from "react";
import { initTodo } from "@data/todo";
import {
  getTodos,
  insertTodo,
  updateTodoComplete,
} from "@/services/todo.service";

const TodoContext = createContext();

const useTodoContext = () => {
  return useContext(TodoContext);
};

const TodoContextProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);
  const [todoNewItem, setTodoNewItem] = useState(initTodo());
  const [isEdit, setIsEdit] = useState(false);

  const getTodoList = useCallback(
    async (userId) => {
      const res = await getTodos(userId);
      if (res?.error) alert(res.error);
      if (res) setTodoList([...res]);
    },
    [setTodoList]
  );

  const todoInsert = useCallback(
    async (userId) => {
      const res = insertTodo({ userId: userId, todo: todoNewItem });
      if (res?.error) alert(res.error);
      else {
        setTodoList([...res]);
        setTodoNewItem({ ...initTodo() });
      }
    },
    [setTodoNewItem, setTodoList, todoNewItem]
  );

  const todoDelete = useCallback(
    async (userId, uid) => {
      const res = await deleteTodo({ userId, uid });
      if (res?.error) {
        alert(res.error);
      } else {
        setTodoList([...res]);
      }
    },
    [setTodoNewItem, setTodoList]
  );

  const todoComplete = useCallback(
    async (userId, uid) => {
      const res = updateTodoComplete({ userId, uid });
      if (res?.error) alert(res.error);
      else setTodoList([...res]);
      setTodoNewItem({ ...initTodo() });
    },
    [setTodoList]
  );

  const todoEdit = (uid) => {
    const editList = todoList.filter((item) => {
      return Number(item.t_todoid) === Number(uid);
    });
    setTodoNewItem({ ...editList[0] });
  };

  const deleteHandler = useCallback(
    ({ target }, userData) => {
      const parent = target.closest("DIV.item");
      const uid = parent.dataset.id;
      const childDiv = parent.childNodes;
      const content = childDiv[2].textContent;
      if (window.confirm(`"${content}"\n할 일 아이템을 삭제합니다.`)) {
        todoDelete(userData.u_userid, uid);
      }
    },
    [todoDelete]
  );

  const completeHandler = ({ target }, userData) => {
    const uid = target.closest("DIV.item").dataset.id;
    todoComplete(userData.u_userid, uid);
  };

  const editHandler = ({ target }) => {
    const parent = target.closest("DIV.item");
    const uid = parent.dataset.id;
    setIsEdit(true);
    todoEdit(uid);
  };

  const todoInsertHandler = (userid) => {
    todoInsert(userid);
    isEdit && setIsEdit(false);
  };

  const changeValueHandler = ({ target }, userid) => {
    const { name, value } = target;
    setTodoNewItem({
      ...todoNewItem,
      [`${name}`]: value,
      t_userid: userid,
    });
  };

  const changePriorHandler = (value) => {
    setTodoNewItem({ ...todoNewItem, t_prior: value });
  };

  const props = {
    todoNewItem,
    setTodoNewItem,
    todoList,
    setTodoList,
    isEdit,
    setIsEdit,
    getTodoList,
    todoInsert,
    todoDelete,
    todoComplete,
    todoEdit,
    deleteHandler,
    completeHandler,
    editHandler,
    changeValueHandler,
    changePriorHandler,
    todoInsertHandler,
  };

  return <TodoContext.Provider value={props}>{children}</TodoContext.Provider>;
};

export { TodoContextProvider, useTodoContext };
