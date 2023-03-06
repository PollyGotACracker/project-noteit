import "../css/Sidebar.css";
import Player from "./Player";
import { useUserContext } from "../context/UserContext";
import { GiStarsStack } from "react-icons/gi";
import { useEffect, useState, useRef } from "react";

const Sidebar = () => {
  const { userData, setUserData } = useUserContext();
  const [image, setImage] = useState({ width: "", height: "" });
  const imgSrc = useRef();

  // 다른 곳으로 옮길 것
  useEffect(() => {
    (async () => {
      const res = await fetch(`user/get`).then((data) => data.json());
      console.log(res.data);
      setUserData({
        ...userData,
        userid: res.data.u_userid,
        nickname: res.data.u_nickname,
        profileimg: res.data.u_profileimg,
        profilestr: res.data.u_profilestr,
        cscore: res.data.u_cscore,
      });
    })();
  }, []);

  return (
    <aside className="Sidebar">
      <Player />
      <div className="profile-img">
        <img
          src={`http://localhost:3000/uploads/${userData?.profileimg}`}
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
                ? `scale(${image.height / image.width})`
                : "",
          }}
        />
      </div>
      <div className="nickname">{userData?.nickname}</div>
      <div className="profile-str">
        <span>{userData?.profilestr}</span>
      </div>
      <div title="점수" className="score">
        <GiStarsStack />
        <div>{userData?.cscore}</div>
      </div>
    </aside>
  );
};

export default Sidebar;
