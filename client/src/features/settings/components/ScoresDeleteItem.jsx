import style from "./scoresDeleteItem.module.css";

export default function ScoresDeleteItem({
  item,
  checkedScores,
  setCheckedScores,
}) {
  const handleCheckScore = (e) => {
    const checked = e.currentTarget.checked;
    const id = e.currentTarget.value;
    if (checked) {
      setCheckedScores([...checkedScores, id]);
    } else {
      setCheckedScores(checkedScores.filter((score) => score !== id));
    }
  };

  return (
    <li key={item.sc_scoid} className={style.item}>
      <input
        className={style.select}
        type="checkbox"
        value={item.sc_scoid}
        onChange={handleCheckScore}
        checked={checkedScores.includes(item.sc_scoid) ? true : false}
      />
      <div className={style.category}>{item.sc_category}</div>
      <div className="date">{item.sc_date}</div>
      <div className="time">{item.sc_time}</div>
      <div className="totalscore">
        {item.sc_score}/{item.sc_totalscore}
      </div>
      <div className="duration">{item.sc_duration}</div>
    </li>
  );
}
