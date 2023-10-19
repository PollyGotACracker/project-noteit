const ScoresDeleteItem = ({ item, checkedScores, setCheckedScores }) => {
  const checkScoreHandler = (e) => {
    const checked = e.currentTarget.checked;
    const id = e.currentTarget.value;
    if (checked) {
      setCheckedScores([...checkedScores, id]);
    } else {
      setCheckedScores(checkedScores.filter((score) => score !== id));
    }
  };

  return (
    <li key={item.sc_scoid} className="item">
      <input
        className="item-checkbox"
        type="checkbox"
        value={item.sc_scoid}
        onChange={checkScoreHandler}
        checked={checkedScores.includes(item.sc_scoid) ? true : false}
      />
      <div className="item-category">{item.sc_category}</div>
      <div className="item-date">{item.sc_date}</div>
      <div className="item-time">{item.sc_time}</div>
      <div className="item-totalscore">
        {item.sc_score}/{item.sc_totalscore}
      </div>
      <div className="item-duration">{item.sc_duration}</div>
    </li>
  );
};

export default ScoresDeleteItem;
