import { atom } from "recoil";
import { initTodo } from "../utils/initData";

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
