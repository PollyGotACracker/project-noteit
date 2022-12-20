import moment from "moment";

const getToday = () => {
  const today = {
    date: moment().format("YYYY[/]MM[/]DD[ ]ddd"),
    time: moment().format("HH:mm:ss"),
  };
  return today;
};

const msgList = [
  "만나서 정말 반가워!",
  "힘들면 30분만 쉬는 거야~",
  "오늘도 화이팅이야!!",
  "1초에 1개씩 까먹는 것 같아!!",
  "조금씩 꾸준히 공부하는거야~",
];

export { getToday, msgList };
