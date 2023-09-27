import "@styles/components/audioPlayer.css";
import { useLayoutEffect, useRef } from "react";
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import { FaPlay, FaPause } from "react-icons/fa";
import useAudioPlayer from "@hooks/useAudioPlayer";
import playList from "@data/playList";

const AudioPlayer = () => {
  const { setPlayState, setPrevAudio, setNextAudio, togglePlay, playIndex } =
    useAudioPlayer({ playList });
  const playImgRef = useRef(null);
  const playerRef = useRef(null);

  useLayoutEffect(() => {
    if (togglePlay) playerRef.current.play();
    else playerRef.current.pause();
  }, [togglePlay, playIndex]);

  const setPlayAnimation = (bool) => {
    if (bool) {
      playImgRef.current.style.animationName = "play";
      playImgRef.current.style.animationPlayState = "running";
    } else {
      playImgRef.current.style.animationPlayState = "paused";
    }
  };

  return (
    <section className="player-box">
      <div className="play-img-wrap">
        <div className="play-img" ref={playImgRef}></div>
      </div>
      <div className="play-name">{playList[playIndex].name}</div>
      <div className="play-btn-box">
        <button className="player-prev-btn" onClick={setPrevAudio}>
          <IoPlaySkipBack />
        </button>
        <button
          className="player-btn"
          title="배경음악"
          onClick={setPlayState}
          type="button"
        >
          {togglePlay ? <FaPause /> : <FaPlay />}
        </button>
        <button className="player-next-btn" onClick={setNextAudio}>
          <IoPlaySkipForward />
        </button>
      </div>
      <audio
        preload="true"
        ref={playerRef}
        src={playList[playIndex].path}
        onPlay={() => setPlayAnimation(true)}
        onPause={() => setPlayAnimation(false)}
        onEnded={() => {
          setPlayAnimation(false);
          setNextAudio();
        }}
      ></audio>
    </section>
  );
};

export default AudioPlayer;
