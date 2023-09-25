import { useState, useReducer } from "react";

const useAudioPlayer = ({ playList }) => {
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

  const [togglePlay, setTogglePlay] = useState(false);
  const [playIndex, setPlayIndex] = useReducer(
    changePlay,
    Math.floor(Math.random() * listLength)
  );

  const setPlayState = () => setTogglePlay(!togglePlay);
  const setPrevAudio = () =>
    setPlayIndex({ type: "PREV", payload: listLength });
  const setNextAudio = () =>
    setPlayIndex({ type: "NEXT", payload: listLength });

  return { setPlayState, setPrevAudio, setNextAudio, togglePlay, playIndex };
};

export default useAudioPlayer;
