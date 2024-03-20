import "@styles/settings/scoresDelete.css";
import { FaDatabase } from "react-icons/fa";
import SettingBox from "@components/settings/wrapper";
import ScoresDeleteContainer from "@components/settings/scoresDeleteContainer";
import Modal from "@components/modal";
import useModals from "@hooks/useModals";

const ScoresDelete = () => {
  const { openModal } = useModals();
  const openScoreList = () => {
    openModal(Modal, {
      content: ScoresDeleteContainer,
      isLarge: true,
    });
  };

  return (
    <SettingBox
      icon={<FaDatabase />}
      title={"퀴즈 데이터 관리"}
      className={"scores-delete"}
    >
      <button className="submit" onClick={openScoreList}>
        목록 보기
      </button>
    </SettingBox>
  );
};

export default ScoresDelete;
