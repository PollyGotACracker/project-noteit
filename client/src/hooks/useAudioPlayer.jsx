import { useEffect, useState, useReducer } from "react";

const useAudioPlayer = ({ ref, playList }) => {
  const listLength = playList.length;

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

  const [isPlaying, setIsPlaying] = useState(false);
  const [playIndex, setPlayIndex] = useReducer(
    changePlay,
    Math.floor(Math.random() * listLength)
  );

  const setPlayState = (state) => {
    if (typeof state === "boolean") setIsPlaying(state);
    else setIsPlaying(!isPlaying);
  };
  const setPrevAudio = () =>
    setPlayIndex({ type: "PREV", payload: listLength });
  const setNextAudio = () =>
    setPlayIndex({ type: "NEXT", payload: listLength });

  const setContinuePlaying = () => setPlayState(true);
  const setStopPlaying = () => setPlayState(false);
  const setNextPlaying = () => {
    setNextAudio();
    setPlayState(true);
  };

  useEffect(() => {
    if (!ref.current) return;
    if (isPlaying) ref.current.play();
    else ref.current.pause();
  }, [ref.current, isPlaying, playIndex]);

  // 모바일 상태표시줄 조작 대응
  useEffect(() => {
    if (!ref.current) return;
    ref.current.addEventListener("play", setContinuePlaying);
    ref.current.addEventListener("pause", setStopPlaying);
    ref.current.addEventListener("ended", setNextPlaying);
    return () => {
      if (ref.current) {
        ref.current.removeEventListener("play", setContinuePlaying);
        ref.current.removeEventListener("pause", setStopPlaying);
        ref.current.removeEventListener("ended", setNextPlaying);
      }
    };
  }, [ref.current]);

  return { setPlayState, setPrevAudio, setNextAudio, isPlaying, playIndex };
};

export default useAudioPlayer;
