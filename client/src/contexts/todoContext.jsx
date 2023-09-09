import { createContext, useContext, useState, useCallback } from "react";
import { initTodo } from "@data/todo";

const TodoContext = createContext();

const useTodoContext = () => {
  return useContext(TodoContext);
};

const TodoContextProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);
  const [todoNewItem, setTodoNewItem] = useState(initTodo());
  const [isEdit, setIsEdit] = useState(false);

  const getTodoList = useCallback(
    async (userid) => {
      try {
        const res = await fetch(`/server/todo/${userid}`).then((data) =>
          data.json()
        );
        if (res.error) {
          alert(res.error);
          setTodoList([]);
        }
        setTodoList([...res]);
      } catch (error) {
        alert("서버 접속 오류");
        setTodoList([]);
      }
    },
    [setTodoList]
  );

  const todoInsert = useCallback(
    async (userid) => {
      try {
        const data = todoNewItem;
        let url = `/server/todo/${userid}/insert`;
        let method = "POST";

        if (Number(todoNewItem.t_todoid) !== 0) {
          url = `/server/todo/${userid}/update`;
          method = "PATCH";
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
          setTodoList([...result]);
        }
        setTodoNewItem({ ...initTodo() });
      } catch (error) {
        console.log(error);
        alert("서버 오류");
      }
    },
    [setTodoNewItem, setTodoList, todoNewItem]
  );

  const todoDelete = useCallback(
    async (userid, uid) => {
      try {
        const res = await fetch(`/server/todo/${userid}/delete/${uid}`, {
          method: "DELETE",
        });
        const result = await res.json();
        if (result.error) {
          alert(result.error);
        } else {
          setTodoList([...result]);
        }
      } catch (error) {
        console.log(error);
        alert("서버 오류");
      }
    },
    [setTodoNewItem, setTodoList]
  );

  const todoComplete = useCallback(
    async (userid, uid) => {
      try {
        const res = await fetch(`/server/todo/${userid}/complete/${uid}`, {
          method: "PATCH",
        });
        const result = await res.json();
        console.log(result);
        if (result.error) {
          return alert(result.error);
        } else {
          setTodoList([...result]);
        }
        setTodoNewItem({ ...initTodo() });
      } catch (error) {
        console.log(error);
        alert("서버 오류");
      }
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
