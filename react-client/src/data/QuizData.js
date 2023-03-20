import moment from "moment";
import uuid from "react-uuid";

export const msgList = {
  start: "시작!",
  correct: "맞았어요!",
  wrong: "틀렸어요...",
  nextKey: "다음 키워드로 넘어왔어요!",
  nextSub: "다음 주제로 넘어왔어요!",
};

export const initScore = () => {
  const score = {
    sc_scoid: uuid().substring(0, 8),
    sc_userid: "",
    sc_date: moment().format("YYYY[-]MM[-]DD"),
    sc_time: moment().format("HH:mm:ss"),
    sc_duration: "",
    sc_catid: "",
    sc_category: "",
    sc_score: 0,
    sc_totalscore: 0,
  };
  return score;
};

export const transferToday = (today, time) => {
  let [hour, minute, second] = time.split(":");
  const ampm = hour >= 12 ? "오후" : "오전";
  hour = hour > 12 ? hour - 12 : hour;

  const [year, month, date] = today.split("-");
  const _day = new Date(today).getDay();
  const day = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ][_day];

  const dateStr = `${year}년 ${month}월 ${date}일 ${day}`;
  const timeStr = `${ampm} ${hour}시 ${minute}분`;
  return { dateStr, timeStr };
};
