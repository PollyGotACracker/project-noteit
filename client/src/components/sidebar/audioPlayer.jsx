import "@styles/components/audioPlayer.css";
import { useEffect, useRef } from "react";
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import { FaPlay, FaPause } from "react-icons/fa";
import useAudioPlayer from "@hooks/useAudioPlayer";
import playList from "@data/playList";

const PlayTitle = ({ index }) => {
  const playTitleRef = useRef(null);

  useEffect(() => {
    const title = playTitleRef.current;
    const titleWidth = title.textContent.length;
    const duration = titleWidth * 0.2;
    title.style.animationDuration = `${duration}s, ${duration * 2}s`;
    title.style.animationDelay = `0.5s, ${duration}s`;
  }, [playTitleRef.current, index]);

  return (
    <span
      ref={playTitleRef}
      key={index}
    >{`${playList[index].title} - ${playList[index].artist}`}</span>
  );
};

const AudioPlayer = () => {
  const playerRef = useRef(null);
  const playImgRef = useRef(null);
  const { setPlayState, setPrevAudio, setNextAudio, isPlaying, playIndex } =
    useAudioPlayer({ ref: playerRef, playList });

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
      <div className={`play-title${isPlaying ? " active" : " inactive"}`}>
        <PlayTitle index={playIndex} />
      </div>
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
          {isPlaying ? <FaPause /> : <FaPlay />}
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
        onEnded={() => setPlayAnimation(false)}
      ></audio>
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
