import { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import useQuizFetcher from "@services/useQuizFetcher";

const ScoresDeleteList = ({
  data,
  categories,
  setStartFetch,
  sort,
  setSort,
  filter,
  setFilter,
}) => {
  const checkboxRef = useRef(null);
  const [checkedScores, setCheckedScores] = useState([]);
  const { deleteScores } = useQuizFetcher();
  const { mutate } = useMutation(
    deleteScores({
      queries: {
        onSuccess: (data) => {
          alert(data);
          setStartFetch(true);
        },
      },
    })
  );

  useEffect(() => {
    setCheckedScores([]);
  }, [data]);

  const sortScoresHandler = (e) => {
    const value = e.currentTarget.dataset.value;
    setStartFetch(() => {
      setSort(value);
      return true;
    });
  };

  const filterScoresHandler = (e) => {
    const id = e.currentTarget.dataset.id;
    setStartFetch(() => {
      setFilter(id);
      return true;
    });
  };

  const getAllScoresHandler = () => {
    setStartFetch(() => {
      setFilter("");
      return true;
    });
  };

  const checkAllScoresHandler = (e) => {
    const checked = e.currentTarget.checked;
    if (checked) {
      const _checkedScores = [];
      data.forEach((score) => _checkedScores.push(score.sc_scoid));
      setCheckedScores(_checkedScores);
    } else setCheckedScores([]);
  };

  const checkScoreHandler = (e) => {
    const checked = e.currentTarget.checked;
    const id = e.currentTarget.value;
    if (checked) {
      setCheckedScores([...checkedScores, id]);
    } else {
      setCheckedScores(checkedScores.filter((score) => score !== id));
    }
  };

  const deleteScoresHandler = () => {
    if (checkedScores.length === 0) return;
    mutate({ ids: checkedScores });
  };

  const catList = categories.map((cat) => (
    <button
      className={cat.sc_catid === filter ? "active" : ""}
      key={cat.sc_catid}
      data-id={cat.sc_catid}
      onClick={filterScoresHandler}
    >
      {cat.sc_category}
    </button>
  ));

  const sorts = [
    { value: "date", label: "날짜" },
    { value: "category", label: "노트" },
  ];

  const sortList = sorts.map((item) => (
    <button
      className={item.value === sort ? "active" : ""}
      key={item.value}
      data-value={item.value}
      onClick={sortScoresHandler}
    >
      {item.label}
    </button>
  ));

  return (
    <section>
      <div>
        <div>정렬: </div>
        {sortList}
      </div>
      <div>노트 필터링</div>
      <div>{catList}</div>
      <button onClick={getAllScoresHandler}>필터링 초기화</button>
      <div>
        전체 선택
        <input
          type="checkbox"
          ref={checkboxRef}
          checked={
            checkedScores.length !== 0 && checkedScores.length === data.length
              ? true
              : false
          }
          onChange={checkAllScoresHandler}
        />
        <div>{`선택 수: ${checkedScores.length}`}</div>
        <button type="button" onClick={deleteScoresHandler}>
          삭제
        </button>
        <div>! 사용자 점수 및 키워드 틀린 횟수에는 적용되지 않습니다.</div>
      </div>
      <ul>
        {data.map((score) => {
          return (
            <li key={score.sc_scoid}>
              <input
                type="checkbox"
                value={score.sc_scoid}
                onChange={checkScoreHandler}
                checked={checkedScores.includes(score.sc_scoid) ? true : false}
              />
              <div>{score.sc_category}</div>
              <div>{score.sc_date}</div>
              <div>{score.sc_time}</div>
              <div>
                {score.sc_score}/{score.sc_totalscore}
              </div>
              <div>{score.sc_duration}</div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default ScoresDeleteList;
