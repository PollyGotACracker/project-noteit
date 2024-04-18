import { FaDatabase } from "react-icons/fa";
import SettingBox from "./SettingBox";
import ScoresDeleteContainer from "./ScoresDeleteContainer";
import useModals from "@hooks/useModals";

export default function ScoresDelete() {
  const { openModal } = useModals();
  const handleOpenScoreList = () => {
    openModal({
      content: ScoresDeleteContainer,
      isLarge: true,
    });
  };

  return (
    <SettingBox icon={<FaDatabase />} title={"퀴즈 데이터 관리"}>
      <button className="submit" onClick={handleOpenScoreList}>
        목록 보기
      </button>
    </SettingBox>
  );
}
