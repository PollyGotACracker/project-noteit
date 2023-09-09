import moment from "moment";

const getClock = () => {
  return {
    date: moment().format("YYYY[/]MM[/]DD[ ]ddd"),
    time: moment().format("LTS"),
  };
};

export default getClock;
