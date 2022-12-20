import moment from "moment";

const getToday = () => {
  const today = {
    date: moment().format("YYYY[/]MM[/]DD[ ]ddd"),
    time: moment().format("HH:mm:ss"),
  };
  return today;
};

export { getToday };
