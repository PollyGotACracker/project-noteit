import moment from "moment";

const getClock = () => {
  const date = moment().format("YYYY[/]MM[/]DD[ ]ddd");
  const [time, ampm] = moment().format("LTS").split(" ");
  return {
    date: date,
    time: time,
    ampm: ampm,
  };
};

export default getClock;
