import { createContext, useContext, useState, useCallback } from "react";
import { initTodo } from "../data/TodoData";

const TodoContext = createContext();

const useTodoContext = () => {
  return useContext(TodoContext);
};

const TodoContextProvider = ({ children }) => {
  const [todoContentList, setTodoContentList] = useState([]);
  const [todoContent, setTodoContent] = useState(initTodo());
  const [isEdit, setIsEdit] = useState(false);

  const fetchAll = useCallback(
    async (userid) => {
      try {
        const res = await fetch(`/todo/${userid}`).then((data) => data.json());
        if (res.error) {
          alert(res.error);
          setTodoContentList([]);
        }
        setTodoContentList([...res]);
      } catch (error) {
        alert("서버 접속 오류");
        setTodoContentList([]);
      }
    },
    [setTodoContentList]
  );

  const todoInsert = useCallback(async () => {
    try {
      const data = todoContent;
      let url = "/todo/insert";
      let method = "POST";

      if (Number(todoContent.t_todoid) !== 0) {
        url = "/todo/update";
        method = "PUT";
      }

      const fetchOption = {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };

      const res = await fetch(url, fetchOption);
      const result = await res.json();
      if (result.error) {
        alert(result.error);
        return false;
      } else {
        setTodoContentList([...result]);
      }
      setTodoContent({ ...initTodo() });
    } catch (error) {
      console.log(error);
      alert("서버 오류");
    }
  }, [setTodoContent, setTodoContentList, todoContent]);

  const todoDelete = useCallback(
    async (uid) => {
      try {
        const res = await fetch(`/todo/delete/${uid}`, { method: "DELETE" });
        const result = await res.json();
        if (result.error) {
          alert(result.error);
        } else {
          setTodoContentList([...result]);
        }
        setTodoContent({ ...initTodo() });
      } catch (error) {
        console.log(error);
        alert("서버 오류");
      }
    },
    [setTodoContent, setTodoContentList]
  );

  const todoComplete = useCallback(
    async (uid) => {
      try {
        const res = await fetch(`/todo/complete/${uid}`, { method: "PUT" });
        const result = await res.json();
        console.log(result);
        if (result.error) {
          return alert(result.error);
        } else {
          setTodoContentList([...result]);
        }
        setTodoContent({ ...initTodo() });
      } catch (error) {
        console.log(error);
        alert("서버 오류");
      }
    },
    [setTodoContentList]
  );

  const todoEdit = (uid) => {
    const editList = todoContentList.filter((item) => {
      return Number(item.t_todoid) === Number(uid);
    });
    setTodoContent({ ...editList[0] });
  };

  const props = {
    fetchAll,
    todoContent,
    setTodoContent,
    todoContentList,
    setTodoContentList,
    isEdit,
    setIsEdit,
    todoInsert,
    todoDelete,
    todoComplete,
    todoEdit,
  };

  return <TodoContext.Provider value={props}>{children}</TodoContext.Provider>;
};

export { TodoContextProvider, useTodoContext };
