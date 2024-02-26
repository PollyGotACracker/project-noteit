import style from "@styles/components/clock.module.css";
import { useLayoutEffect, useState } from "react";
import getClock from "@utils/getClock";

const Clock = () => {
  const { date: initDate, time: initTime, ampm: initAmpm } = getClock();
  const [date, setDate] = useState(initDate);
  const [time, setTime] = useState(initTime);
  const [ampm, setAmpm] = useState(initAmpm);

  const changeClock = () => {
    const { date, time, ampm } = getClock();
    setTime(time);
    setAmpm(ampm);
    setDate(date);
  };

  // setInterval 은 설정한 시간을 보장하지 않기 때문에 setTimeout 재귀함수 사용
  useLayoutEffect(() => {
    const clock = setTimeout(changeClock, setTimeout(changeClock, 1000), 1000);
    return () => clearTimeout(clock);
  }, [date, time]);

  return (
    <section className={style.clock}>
      <div className={style.today}>{date}</div>
      <div className={style.today}>{time}</div>
      <div className={style.today}>{ampm}</div>
    </section>
  );
};

export default Clock;
