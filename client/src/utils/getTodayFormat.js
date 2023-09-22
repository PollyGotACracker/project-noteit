export const getTodayFormat = (today, time) => {
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

export default getTodayFormat;
