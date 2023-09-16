import { atom } from "recoil";
import moment from "moment";

export const todosState = atom({
  key: "todosState",
  default: [],
});

export const todoState = atom({
  key: "todoState",
  default: {
    t_todoid: 0,
    t_userid: "",
    t_date: moment().format("YYYY[-]MM[-]DD"),
    t_time: moment().format("HH:mm:ss"),
    t_content: "",
    t_deadline: "",
    t_prior: 5,
    t_compdate: "",
    t_comptime: "",
  },
});

export const editState = atom({
  key: "editState",
  default: false,
});
