import "../css/Sidebar.css";
import Player from "./Player";
import { useUserContext } from "../context/UserContext";
import { GiStarsStack } from "react-icons/gi";

const Sidebar = () => {
  const { nickname, profileImg, profileStr, cscore } = useUserContext();
  return (
    <aside className="Sidebar">
      <Player />
      <div className="nickname">{nickname}</div>
      <div className="profile-img">
        <img />
      </div>
      <div className="profile-str">
        <span>{profileStr}</span>
      </div>
      <div title="점수" className="score">
        <GiStarsStack />
        <div>{cscore}</div>
      </div>
    </aside>
  );
};

export default Sidebar;
