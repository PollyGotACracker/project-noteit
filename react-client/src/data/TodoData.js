import moment from "moment";

const TodoData = () => {
  const Todo = {
    t_todoid: 0,
    t_userid: "polly@gmail.com",
    t_date: moment().format("YYYY[-]MM[-]DD"),
    t_time: moment().format("HH:mm:ss"),
    t_content: "",
    t_deadline: "",
    t_prior: 5,
    t_compdate: "",
    t_comptime: "",
  };
  return Todo;
};

export { TodoData };
