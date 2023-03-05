import { useState, useLayoutEffect, useRef } from "react";
import { FaCompactDisc } from "react-icons/fa";

const Player = () => {
  const bgPlaylist = [
    "/audios/Lonesome_Star.mp3",
    "/audios/Jeremiah_s_Song.mp3",
    "/audios/The_Gift.mp3",
  ];

  const [togglePlay, setTogglePlay] = useState(false);
  const [playIndex, setPlayIndex] = useState(
    Math.floor(Math.random() * bgPlaylist.length)
  );
  const playerRef = useRef(null);

  useLayoutEffect(() => {
    if (togglePlay) {
      playerRef.current.play();
    } else {
      playerRef.current.pause();
    }
  }, [togglePlay, playIndex]);

  const playNextAudio = () => {
    if (playIndex === bgPlaylist.length - 1) {
      setPlayIndex(0);
    } else {
      setPlayIndex(playIndex + 1);
    }
  };

  return (
    <button
      className={togglePlay ? "player-btn active" : "player-btn"}
      title="배경음악"
      onClick={() => {
        setTogglePlay(!togglePlay);
      }}
      type="button"
    >
      <audio
        preload="true"
        ref={playerRef}
        src={`${process.env.PUBLIC_URL}${bgPlaylist[playIndex]}`}
        onEnded={playNextAudio}
      ></audio>
      <FaCompactDisc />
    </button>
  );
};

export default Player;