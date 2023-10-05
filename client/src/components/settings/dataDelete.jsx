import { FaDatabase } from "react-icons/fa";
import SettingBox from "@components/settings/wrapper";

const DataDelete = () => {
  return (
    <SettingBox icon={<FaDatabase />} title={"데이터 삭제"}>
      <div className="data-box">
        <button>노트 삭제</button>
        <button>목표 삭제</button>
        <button>점수 삭제</button>
      </div>
    </SettingBox>
  );
};

export default DataDelete;
