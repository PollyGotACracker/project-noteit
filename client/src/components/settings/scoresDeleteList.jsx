import { useRef } from "react";
import { useMutation } from "react-query";
import useQuizFetcher from "@services/useQuizFetcher";
import ScoresDeleteItem from "@components/settings/scoresDeleteItem";

const ScoresDeleteList = ({ data, checkedScores, setCheckedScores }) => {
  const checkboxRef = useRef(null);
  const { deleteScores } = useQuizFetcher();
  const { mutate } = useMutation(deleteScores());

  const checkAllScoresHandler = (e) => {
    const checked = e.currentTarget.checked;
    if (checked) {
      const _checkedScores = [];
      data.forEach((score) => _checkedScores.push(score.sc_scoid));
      setCheckedScores(_checkedScores);
    } else setCheckedScores([]);
  };

  const deleteScoresHandler = () => {
    if (checkedScores.length === 0) return;
    mutate({ ids: checkedScores });
  };

  return (
    <>
      <div className="delete-wrapper">
        <input
          className="select-all"
          type="checkbox"
          ref={checkboxRef}
          checked={
            checkedScores.length !== 0 && checkedScores.length === data.length
              ? true
              : false
          }
          onChange={checkAllScoresHandler}
        />
        <div className="select-counter">{`${checkedScores.length} 개 선택`}</div>
        <button
          className="delete-btn"
          type="button"
          onClick={deleteScoresHandler}
        >
          삭제
        </button>
      </div>
      <ul className="score-list">
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
};

export default ScoresDeleteList;
