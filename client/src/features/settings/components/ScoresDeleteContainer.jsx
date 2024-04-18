import style from "./scoresDeleteContainer.module.css";
import { useState } from "react";
import { useQuery } from "react-query";
import { AiOutlineInfoCircle } from "react-icons/ai";
import useScoresDeleteFetcher from "../services/useScoresDeleteFetcher";
import ScoresDeleteList from "./ScoresDeleteList";
import useDropDown from "@hooks/useDropdown";
import cx from "classnames";

const sorts = [
  { value: "date", label: "날짜" },
  { value: "category", label: "노트" },
];

export default function ScoresDeleteContainer() {
  const { getScores } = useScoresDeleteFetcher();
  const [isFilterOpen, setIsFilterOpen, swtichIstFilterOpen] = useDropDown();
  const [startFetch, setStartFetch] = useState(true);
  const [checkedScores, setCheckedScores] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("노트 필터링");
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

  const handleSortScores = (e) => {
    const value = e.currentTarget.dataset.value;
    setStartFetch(() => {
      setSort(value);
      return true;
    });
  };

  const handleFilterScores = (e) => {
    const id = e.currentTarget.dataset.id;
    setStartFetch(() => {
      setFilter(id);
      return true;
    });
    setCurrentFilter(e.currentTarget.textContent);
    setIsFilterOpen(false);
  };

  const handleClearFilter = () => {
    if (!!!filter) return;
    setStartFetch(() => {
      setFilter("");
      return true;
    });
    setCurrentFilter("노트 필터링");
    setIsFilterOpen(false);
  };

  return (
    <section className={style.container}>
      <div className={style.menu}>
        <div>정렬 기준: </div>
        {sorts.map((item) => (
          <button
            className={item.value === sort ? "active" : ""}
            key={item.value}
            data-value={item.value}
            onClick={handleSortScores}
            type="button"
          >
            {item.label}
          </button>
        ))}
        <div className={cx(style.filter_box, { [style.opened]: isFilterOpen })}>
          <button
            className={style.select_filter}
            onClick={swtichIstFilterOpen}
            type="button"
          >
            {currentFilter}
          </button>
          <div className={style.filter_option_wrapper}>
            {categories.map((cat) => (
              <button
                className={cx(style.filter_option, {
                  [style.active]: cat.sc_catid === filter,
                })}
                key={cat.sc_catid}
                data-id={cat.sc_catid}
                onClick={handleFilterScores}
                type="button"
              >
                <span>{cat.sc_category}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className={style.info}>
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
          className={style.clear_filter}
          onClick={handleClearFilter}
          type="button"
        >
          필터링 초기화
        </button>
      )}
    </section>
  );
}

function Filter() {}
