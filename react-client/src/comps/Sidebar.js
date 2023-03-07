import "../css/Sidebar.css";
import Player from "./Player";
import { useUserContext } from "../context/UserContext";
import { GiStarsStack } from "react-icons/gi";
import { useState, useRef } from "react";
import profile from "../assets/images/profile.png";

const Sidebar = () => {
  const { userData } = useUserContext();
  const [image, setImage] = useState({ width: "", height: "" });
  const imgSrc = useRef();

  return (
    <aside className="Sidebar">
      <div className="profile-img">
        <img
          src={
            userData?.u_profileimg !== ""
              ? `http://localhost:3000/uploads/${userData?.u_profileimg}`
              : profile
          }
          ref={imgSrc}
          onLoad={() =>
            setImage({
              ...image,
              width: imgSrc.current?.naturalWidth,
              height: imgSrc.current?.naturalHeight,
            })
          }
          style={{
            transform:
              image.width < image.height
                ? `scale(${(image.height / image.width) * 1.1})`
                : "",
          }}
        />
      </div>
      <div className="nickname">{userData?.u_nickname}</div>
      <div className="profile-str">
        <span>{userData?.u_profilestr}</span>
      </div>
      <div title="점수" className="score">
        <GiStarsStack />
        <div>{userData?.u_cscore}</div>
      </div>
      <section className="player">
        <Player />
      </section>
    </aside>
  );
};

export default Sidebar;
