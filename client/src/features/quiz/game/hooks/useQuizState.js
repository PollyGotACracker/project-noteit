import {
  keyIdxState,
  keyListState,
  subIdxState,
  subListState,
} from "../recoils/game";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const useQuizState = () => {
  const subjectList = useRecoilValue(subListState);
  const keywordList = useRecoilValue(keyListState);
  const subIndex = useRecoilValue(subIdxState);
  const keyIndex = useRecoilValue(keyIdxState);
  const checkSub = subIndex === subjectList?.length - 1;
  const checkKey = keyIndex === keywordList?.length - 1;
  const [isLastSubject, setIsLastSubject] = useState(checkSub);
  const [isLastKeyword, setIsLastKeyword] = useState(checkKey);

  useEffect(() => {
    setIsLastSubject(checkSub);
  }, [subIndex, subjectList]);

  useEffect(() => {
    setIsLastKeyword(checkKey);
  }, [keyIndex, keywordList]);

  return {
    isLastSubject,
    isLastKeyword,
  };
};

export default useQuizState;
