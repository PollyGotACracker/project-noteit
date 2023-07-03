import { useState, useLayoutEffect, useRef, useReducer } from "react";
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import { FaPlay, FaPause } from "react-icons/fa";

const changePlay = (state, action) => {
  switch (action.type) {
    case "PREV":
      if (state > 0) return state - 1;
      else if (state === 0) return action.payload - 1;
    case "NEXT":
      if (state < action.payload - 1) return state + 1;
      else if (state === action.payload - 1) return 0;
    default:
      return state;
  }
};
const Player = () => {
  const bgPlaylist = [
    { name: "Lonesome Star", path: "/audios/Lonesome_Star.mp3" },
    { name: "Jeremah's Song", path: "/audios/Jeremiah_s_Song.mp3" },
    { name: "The Gift", path: "/audios/The_Gift.mp3" },
  ];
  const [playIndex, setPlayIndex] = useReducer(
    changePlay,
    Math.floor(Math.random() * bgPlaylist.length)
  );
  const [togglePlay, setTogglePlay] = useState(false);
  const playIconRef = useRef(null);
  const playerRef = useRef(null);

  useLayoutEffect(() => {
    if (togglePlay) {
      playerRef.current.play();
    } else {
      playerRef.current.pause();
    }
  }, [togglePlay, playIndex]);

  return (
    <>
      <div className="play-icon-wrap">
        <div className="play-icon" ref={playIconRef}></div>
      </div>
      <div className="play-name">{bgPlaylist[playIndex].name}</div>
      <div className="play-btn-box">
        <button
          className="player-prev-btn"
          onClick={() =>
            setPlayIndex({ type: "PREV", payload: bgPlaylist.length })
          }
        >
          <IoPlaySkipBack />
        </button>
        <button
          className="player-btn"
          title="배경음악"
          onClick={() => {
            setTogglePlay(!togglePlay);
          }}
          type="button"
        >
          {togglePlay ? <FaPause /> : <FaPlay />}
        </button>
        <button
          className="player-next-btn"
          onClick={() =>
            setPlayIndex({ type: "NEXT", payload: bgPlaylist.length })
          }
        >
          <IoPlaySkipForward />
        </button>
      </div>
      <audio
        preload="true"
        ref={playerRef}
        src={`${process.env.PUBLIC_URL}${bgPlaylist[playIndex].path}`}
        onPlay={() => {
          playIconRef.current.style.animationName = "play";
          playIconRef.current.style.animationPlayState = "running";
        }}
        onPause={() => {
          playIconRef.current.style.animationPlayState = "paused";
        }}
        onEnded={() => {
          playIconRef.current.style.animationPlayState = "paused";
          setPlayIndex({ type: "NEXT", payload: bgPlaylist.length });
        }}
      ></audio>
    </>
  );
};

export default Player;
