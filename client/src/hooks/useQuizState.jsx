import {
  keyIdxState,
  keyListState,
  subIdxState,
  subListState,
} from "@recoils/quiz";
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

/**
 * cf)
 * useRef 변수의 current 를 return 할 경우,
 * 이 값을 사용하는 컴포넌트에서는 값이 변경되었음을 감지하지 못한다.
 * 따라서 외부로 export 할 용도로 사용하지 말 것
 */
