import { useState } from "react";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import { FaDatabase } from "react-icons/fa";
import { modalSelector } from "@recoils/global";
import useQuizFetcher from "@services/useQuizFetcher";
import SettingBox from "@components/settings/wrapper";
import ScoresDeleteList from "@components/settings/scoresDeleteList";
import Modal from "@components/modal";

const ScoresDelete = () => {
  const openModal = useSetRecoilState(modalSelector);
  const { getScores } = useQuizFetcher();
  const [startFetch, setStartFetch] = useState(false);
  const [sort, setSort] = useState("date");
  const [filter, setFilter] = useState("");
  const { data: { categories = [], data = [] } = {} } = useQuery(
    getScores({ sort, filter, queries: { enabled: startFetch } })
  );

  return (
    <SettingBox icon={<FaDatabase />} title={"퀴즈 데이터 관리"}>
      <div className="data-box">
        <button
          onClick={() => {
            setStartFetch(true);
            openModal(true);
          }}
        >
          목록 보기
        </button>
      </div>
      <Modal
        content={
          <ScoresDeleteList
            categories={categories}
            data={data}
            setStartFetch={setStartFetch}
            sort={sort}
            setSort={setSort}
            filter={filter}
            setFilter={setFilter}
          />
        }
      />
    </SettingBox>
  );
};

export default ScoresDelete;
