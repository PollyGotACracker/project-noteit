import style from "./scoresDeleteList.module.css";
import { useRef } from "react";
import { useMutation } from "react-query";
import useScoresDeleteFetcher from "../services/useScoresDeleteFetcher";
import ScoresDeleteItem from "./ScoresDeleteItem";

export default function ScoresDeleteList({
  data,
  checkedScores,
  setCheckedScores,
}) {
  const checkboxRef = useRef(null);
  const { deleteScores } = useScoresDeleteFetcher();
  const { mutate } = useMutation(deleteScores());

  const handleCheckAllScores = (e) => {
    const checked = e.currentTarget.checked;
    if (checked) {
      const _checkedScores = [];
      data.forEach((score) => _checkedScores.push(score.sc_scoid));
      setCheckedScores(_checkedScores);
    } else setCheckedScores([]);
  };

  const handleDeleteScores = () => {
    if (checkedScores.length === 0) return;
    mutate({ ids: checkedScores });
  };

  return (
    <>
      <div className={style.delete_box}>
        <input
          className={style.select_all}
          type="checkbox"
          ref={checkboxRef}
          checked={
            checkedScores.length !== 0 && checkedScores.length === data.length
              ? true
              : false
          }
          onChange={handleCheckAllScores}
        />
        <p
          className={style.selected_text}
        >{`${checkedScores.length} 개 선택`}</p>
        <button
          className="delete"
          title="점수 삭제"
          type="button"
          onClick={handleDeleteScores}
        >
          삭제
        </button>
      </div>
      <ul className={style.score_list}>
        {data.map((score) => (
          <ScoresDeleteItem
            key={score.sc_scoid}
            item={score}
            checkedScores={checkedScores}
            setCheckedScores={setCheckedScores}
          />
        ))}
      </ul>
    </>
  );
}
