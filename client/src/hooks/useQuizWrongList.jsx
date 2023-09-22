import { useState } from "react";
import { useRecoilValue } from "recoil";
import {
  keyIdxState,
  keyListState,
  subIdxState,
  subListState,
} from "@recoils/quiz";

const useQuizWrongList = () => {
  const subjectList = useRecoilValue(subListState);
  const keywordList = useRecoilValue(keyListState);
  const subIndex = useRecoilValue(subIdxState);
  const keyIndex = useRecoilValue(keyIdxState);
  const [wrongAnswer, setWrongAnswer] = useState([]);

  const addWrongItem = ({ state, answer = "건너뛴 문제입니다." }) => {
    const valids = ["correct", "wrong", "nextSub", "nextKey"];
    if (!valids.includes(state))
      throw new Error(`state 값은 다음 중 하나여야 합니다: ${valids}`);

    setWrongAnswer((prev) => {
      let _prev = [...prev];
      const length = _prev.length;
      const lastSub = _prev[length - 1]?.s_subid;
      const currentSub = subjectList[subIndex].s_subid;

      // 현재 sub 추가 후 다음 조건으로 이동
      const isNoPrevSub = length === 0;
      const isDiffSub = length !== 0 && lastSub !== currentSub;
      if (isNoPrevSub || isDiffSub) {
        const newSubData = {
          ...subjectList[subIndex],
          wrong: [],
        };
        delete newSubData.tbl_keywords;
        _prev = [..._prev, newSubData];
      }

      const isKeyWrong = state === "wrong" || state === "nextKey";
      const isKeysWrong = state === "nextSub";
      const lastIndex = _prev.length - 1;
      const prevWrongs = _prev[lastIndex]?.wrong;
      if (isKeyWrong) {
        const keyData = { ...keywordList[keyIndex], answer: answer };
        _prev[lastIndex].wrong = [...prevWrongs, keyData];
      }
      if (isKeysWrong) {
        const keyData = keywordList
          ?.filter((_, index) => index >= keyIndex)
          ?.map((item) => (item = { ...item, answer: answer }));
        _prev[lastIndex].wrong = [...prevWrongs, ...keyData];
      }

      return _prev;
    });
  };

  return { wrongAnswer, addWrongItem };
};

export default useQuizWrongList;
