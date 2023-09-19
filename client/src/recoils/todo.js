import { atom } from "recoil";

export const initTodo = () => ({
  // t_todoid: autoIncrement
  t_todoid: 0,
  t_userid: "",
  t_date: "",
  t_time: "",
  t_content: "",
  t_deadline: "",
  t_prior: 5,
  t_compdate: "",
  t_comptime: "",
});

export const todosState = atom({
  key: "todosState",
  default: [],
});

export const todoState = atom({
  key: "todoState",
  default: initTodo(),
});

export const editState = atom({
  key: "editState",
  default: false,
});
