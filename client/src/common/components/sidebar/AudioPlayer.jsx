import style from "./audioPlayer.module.css";
import { useRef } from "react";
import cx from "classnames";
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import { FaPlay, FaPause } from "react-icons/fa";
import useAudioPlayer from "@hooks/useAudioPlayer";
import playList from "@data/playList";

export default function AudioPlayer() {
  const playerRef = useRef(null);
  const { setPlayState, setPrevAudio, setNextAudio, isPlaying, playIndex } =
    useAudioPlayer({ ref: playerRef, playList });

  return (
    <section className={style.audio_player}>
      <div className={style.disk_box}>
        <div
          className={cx(style.disk, {
            [style.active]: isPlaying,
          })}
        />
      </div>
      <div className={style.title_wrapper}>
        <PlayTitle index={playIndex} isPlaying={isPlaying} />
      </div>
      <div className={style.controller_box}>
        <button
          className="prev"
          title="이전 배경음악"
          type="button"
          onClick={setPrevAudio}
        >
          <IoPlaySkipBack />
        </button>
        <button
          className="toggle"
          title="토글 배경음악"
          type="button"
          onClick={setPlayState}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button
          className="next"
          title="다음 배경음악"
          type="button"
          onClick={setNextAudio}
        >
          <IoPlaySkipForward />
        </button>
      </div>
      <audio preload="true" ref={playerRef} src={playList[playIndex].path} />
    </section>
  );
}

function PlayTitle({ index, isPlaying }) {
  const setAnimation = (e) => {
    const duration = e.target.clientWidth * 0.03;
    e.target.style.animationDuration = `${duration}s, ${duration + 2}s`;
    e.target.style.animationDelay = `0.5s, ${duration + 0.5}s`;
  };

  return (
    <span
      key={index}
      className={cx(style.title, {
        [style.active]: isPlaying,
      })}
      onAnimationStart={setAnimation}
    >{`${playList[index].title} - ${playList[index].artist}`}</span>
  );
}
