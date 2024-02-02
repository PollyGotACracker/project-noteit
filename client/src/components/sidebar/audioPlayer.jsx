import style from "@styles/components/audioPlayer.module.css";
import { useRef } from "react";
import cx from "classnames";
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import { FaPlay, FaPause } from "react-icons/fa";
import useAudioPlayer from "@hooks/useAudioPlayer";
import playList from "@data/playList";

const PlayTitle = ({ index, isPlaying }) => {
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
};

const AudioPlayer = () => {
  const playerRef = useRef(null);
  const { setPlayState, setPrevAudio, setNextAudio, isPlaying, playIndex } =
    useAudioPlayer({ ref: playerRef, playList });

  return (
    <section className={style.bg_audio_player}>
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
};

export default AudioPlayer;

/**
 * cf) css animation restart 를 위해 컴포넌트화하여 element 렌더링
 * ** 컴포넌트를 부모 컴포넌트 밖으로 빼낼 경우 **
 * 리렌더링되는 element 에 key 를 따로 붙이지 않으면,
 * 텍스트는 변경되더라도 css animation 은 재시작되지 않음
 * 이때 key 는 현재 요소를 이전 요소와는 다른 요소로 인식하여 강제 렌더링하는 역할을 함(초기화)
 */
