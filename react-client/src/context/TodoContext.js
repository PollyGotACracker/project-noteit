import {
  createContext,
  useContext,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";
import { initTodo } from "../data/TodoData";

const TodoContext = createContext();

const useTodoContext = () => {
  return useContext(TodoContext);
};

const TodoContextProvider = ({ children }) => {
  const [todoContentList, setTodoContentList] = useState([]);
  const [todoContent, setTodoContent] = useState(initTodo());

  const fetchAll = useCallback(async () => {
    try {
      const res = await fetch("/todo");
      const result = await res.json();
      console.log(result);
      if (result.error) {
        alert(result.error);
        setTodoContentList([]);
      }
      setTodoContentList([...result]);
    } catch (error) {
      alert("서버 접속 오류");
      setTodoContentList([]);
    }
  }, [setTodoContentList]);

  useLayoutEffect(() => {
    (async () => {
      await fetchAll();
    })();
  }, [fetchAll]);

  const todoInsert = useCallback(
    async (t_content, t_deadline) => {
      try {
        const regexp = new RegExp(
          "^d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$"
        );
        if (regexp.test(t_deadline)) {
          t_deadline = "";
        }
        let data = { ...initTodo(), t_content, t_deadline };
        let url = "/todo/insert";
        let method = "POST";

        if (Number(todoContent.t_todoid) !== 0) {
          data = todoContent;
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
    },
    [setTodoContent, setTodoContentList, todoContentList, todoContent]
  );

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

  const todoEditor = (uid) => {
    const editorList = todoContentList.filter((item) => {
      return Number(item.t_todoid) === Number(uid);
    });
    setTodoContent({ ...editorList[0] });
  };

  const props = {
    todoContent,
    setTodoContent,
    todoContentList,
    setTodoContentList,
    todoInsert,
    todoDelete,
    todoComplete,
    todoEditor,
  };

  return <TodoContext.Provider value={props}>{children}</TodoContext.Provider>;
};

export { TodoContextProvider, useTodoContext };
