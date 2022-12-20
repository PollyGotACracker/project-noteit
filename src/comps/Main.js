import { useState } from "react";
import "../css/Main.css";
import { getToday } from "../data/HomeData";

const Main = () => {
  const [date, setDate] = useState(getToday().date);
  const [time, setTime] = useState(getToday().time);

  const msgContent = "오늘도 화이팅!!";

  return (
    <main className="Main">
      <section>
        <div className="Main today">{date}</div>
        <div className="Main today">{time}</div>
        <div className="Main msg">{msgContent}</div>
        <div className="Main img"></div>
      </section>
    </main>
  );
};

export default Main;
