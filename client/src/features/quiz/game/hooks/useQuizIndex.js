import { useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { keyIndexState, subIndexState } from "../recoils/game";
import feedback from "../constants/feedback";

const useQuizIndex = ({ data = [] }) => {
  const [subIndex, setSubIndex] = useRecoilState(subIndexState);
  const [keyIndex, setKeyIndex] = useRecoilState(keyIndexState);

  const setFirstSub = useResetRecoilState(subIndexState);
  const setFirstKey = useResetRecoilState(keyIndexState);
  const setNextSub = () => setSubIndex(subIndex + 1);
  const setNextKey = () => setKeyIndex(keyIndex + 1);

  const isLastSub = () => data.length - 1 === subIndex;
  const isLastKey = () => data[subIndex]?.tbl_keywords.length - 1 === keyIndex;

  const setNextSubject = () => {
    if (!isLastSub()) {
      setNextSub();
      setFirstKey();
      return feedback.nextSub;
    }
    if (isLastSub()) {
      return false;
    }
  };

  const setNextKeyword = () => {
    if (!isLastKey()) {
      setNextKey();
      return feedback.nextKey;
    }
    if (!isLastSub() && isLastKey()) {
      setNextSub();
      setFirstKey();
      return feedback.nextSub;
    }
    if (isLastSub() && isLastKey()) {
      return false;
    }
  };

  useEffect(() => {
    return () => {
      setFirstSub();
      setFirstKey();
    };
  }, [data]);

  return {
    setNextSubject,
    setNextKeyword,
  };
};

export default useQuizIndex;
