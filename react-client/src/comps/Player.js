import { useState, useLayoutEffect, useRef } from "react";
import { FaCompactDisc } from "react-icons/fa";

const Player = () => {
  const bgPlaylist = [
    "../public/audios/Lonesome_Star.mp3",
    "../public/audios/Jeremiah_s_Song.mp3",
    "../public/audios/The_Gift.mp3",
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
  }, [togglePlay]);

  const playNextAudio = () => {
    if (playIndex === bgPlaylist.length - 1) {
      setPlayIndex(0);
    } else {
      setPlayIndex(playIndex + 1);
    }
    playerRef.current.play();
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
        src={bgPlaylist[playIndex]}
        onEnded={playNextAudio}
      ></audio>
      <FaCompactDisc />
    </button>
  );
};

export default Player;
