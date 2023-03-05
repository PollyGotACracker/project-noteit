import "../css/Sidebar.css";
import Player from "./Player";
import { useUserContext } from "../context/UserContext";

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
      <div className="point">
        POINT
        <div>{cscore}</div>
      </div>
    </aside>
  );
};

export default Sidebar;
