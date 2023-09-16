import React from "react";
import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
import { useMutation } from "react-query";
import moment from "moment";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { editState, todoState, todosState } from "@recoils/todo";
import { deleteTodo, updateTodoComplete } from "@services/todo.service";
import { QueryKeys, getClient } from "@services/core";

const TodoItem = ({ item }) => {
  const userId = "polly@gmail.com";
  const queryClient = getClient();
  const [todoList, setTodoList] = useRecoilState(todosState);
  const setTodoItem = useSetRecoilState(todoState);
  const resetTodoItem = useResetRecoilState(todoState);
  const setIsEdit = useSetRecoilState(editState);

  const { mutate: deleteMutation } = useMutation(deleteTodo, {
    onSuccess: (data) => {
      if (data?.error) alert(data.error);
      else {
        queryClient.invalidateQueries(QueryKeys.TODO);
        setTodoList([...data]);
      }
    },
  });

  const { mutate: updateCompleteMutation } = useMutation(updateTodoComplete, {
    onSuccess: (data) => {
      if (data?.error) alert(data.error);
      else {
        queryClient.invalidateQueries(QueryKeys.TODO);
        setTodoList([...data]);
        resetTodoItem();
      }
    },
  });

  const completeHandler = ({ target }) => {
    const uid = target.closest("DIV.item").dataset.id;
    updateCompleteMutation({ userId, uid });
  };

  const editHandler = ({ target }) => {
    const parent = target.closest("DIV.item");
    const uid = parent.dataset.id;
    const editList = todoList.filter(
      (item) => Number(item.t_todoid) === Number(uid)
    )[0];
    setTodoItem({ ...editList });
    setIsEdit(true);
  };

  const deleteHandler = ({ target }) => {
    const parent = target.closest("DIV.item");
    const uid = parent.dataset.id;
    const childDiv = parent.childNodes;
    const content = childDiv[2].textContent;
    if (window.confirm(`"${content}"\n할 일 아이템을 삭제합니다.`)) {
      deleteMutation({ userId, uid });
    }
  };

  const today = moment().format("YYYY[-]MM[-]DD");
  const isToday = item.t_deadline === today;
  const dDay =
    (new Date(today) - new Date(item.t_deadline)) / (1000 * 60 * 60 * 24);

  return (
    <div className="item" data-id={item.t_todoid}>
      <div className="complete" onClick={completeHandler}>
        <AiOutlineCheck />
      </div>
      <div className="date">
        <div>{item.t_date}</div>
        <div>{item.t_time}</div>
      </div>
      <div
        className={item.t_compdate ? "content line" : "content"}
        onClick={editHandler}
        title="수정"
      >
        {item.t_content}
      </div>
      <div className={isToday ? "deadline active" : "deadline"}>
        {item.t_deadline}
      </div>
      <div className={isToday ? "deadline active" : "deadline"}>
        {!item?.t_deadline
          ? ""
          : isToday
          ? "D-day"
          : `D${dDay > 0 ? "+" : ""}${dDay}`}
      </div>
      <div className="prior" data-prior={item.t_prior}></div>
      <div className="delete" onClick={deleteHandler}>
        <AiOutlineClose />
      </div>
    </div>
  );
};

export default React.memo(TodoItem);
