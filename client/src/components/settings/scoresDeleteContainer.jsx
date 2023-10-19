import { useState } from "react";
import { useQuery } from "react-query";
import { AiOutlineInfoCircle } from "react-icons/ai";
import useQuizFetcher from "@services/useQuizFetcher";
import ScoresDeleteList from "@components/settings/scoresDeleteList";

const ScoresDeleteContainer = () => {
  const { getScores } = useQuizFetcher();
  const [startFetch, setStartFetch] = useState(true);
  const [checkedScores, setCheckedScores] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("노트 필터링");
  const [showFilter, setShowFilter] = useState(false);
  const [sort, setSort] = useState("date");
  const [filter, setFilter] = useState("");
  const { data: { categories = [], data = [] } = {} } = useQuery(
    getScores({
      sort,
      filter,
      queries: {
        enabled: startFetch,
        onSuccess: () => {
          setCheckedScores([]);
        },
      },
    })
  );

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
    setCurrentFilter(e.currentTarget.textContent);
    setShowFilter(false);
  };

  const clearFilterHandler = () => {
    if (!!!filter) return;
    setStartFetch(() => {
      setFilter("");
      return true;
    });
    setCurrentFilter("노트 필터링");
    setShowFilter(false);
  };

  const sorts = [
    { value: "date", label: "날짜" },
    { value: "category", label: "노트" },
  ];

  return (
    <section className="scores-delete-container">
      <div className="menu">
        <div>정렬 기준: </div>
        {sorts.map((item) => (
          <button
            className={item.value === sort ? "active" : ""}
            key={item.value}
            data-value={item.value}
            onClick={sortScoresHandler}
            type="button"
          >
            {item.label}
          </button>
        ))}
        <div
          className={showFilter ? "filter-wrapper active" : "filter-wrapper"}
        >
          <button
            className="filter-select"
            type="button"
            onClick={() => setShowFilter(!showFilter)}
          >
            {currentFilter}
          </button>
          <div className="filter-option-wrapper">
            {categories.map((cat) => (
              <button
                className={
                  cat.sc_catid === filter
                    ? "filter-btn active"
                    : "filter-option"
                }
                key={cat.sc_catid}
                data-id={cat.sc_catid}
                onClick={filterScoresHandler}
                type="button"
              >
                {cat.sc_category}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="info">
        <AiOutlineInfoCircle />
        사용자 점수 및 키워드 틀린 횟수에는 반영되지 않습니다.
      </div>
      <ScoresDeleteList
        data={data}
        checkedScores={checkedScores}
        setCheckedScores={setCheckedScores}
      />
      {!!filter && (
        <button
          className="clear-filter-btn"
          onClick={clearFilterHandler}
          type="button"
        >
          필터링 초기화
        </button>
      )}
    </section>
  );
};

export default ScoresDeleteContainer;
