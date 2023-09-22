import { useRef, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { keyIdxState, keyListState, subListState } from "@recoils/quiz";

const useQuizScore = () => {
  const subjectList = useRecoilValue(subListState);
  const keywordList = useRecoilValue(keyListState);
  const keyIndex = useRecoilValue(keyIdxState);
  const [perfectScore, setPerfectScore] = useState(0);
  const correctList = useRef([]);

  const checkQuizAnswer = (userAnswer) => {
    const answer = userAnswer?.toUpperCase()?.replaceAll(" ", "");
    const isCorrect = correctList.current?.includes(answer);
    return isCorrect;
  };

  useEffect(() => {
    if (subjectList.length !== 0) {
      let score = 0;
      for (let i of subjectList) {
        const keycount = i.s_keycount;
        score += keycount * 5;
      }
      setPerfectScore(score);
    }
  }, [subjectList]);

  // 키워드가 A(B, c) 일 경우 ["A", "B", "C"] 반환
  useEffect(() => {
    const currentKeyStr = keywordList[keyIndex]?.k_keyword;
    correctList.current = currentKeyStr
      ?.toUpperCase()
      ?.replaceAll(" ", "")
      ?.split(/[(,)]/)
      ?.filter((item) => item !== "");
  }, [keywordList, keyIndex]);

  return { perfectScore, checkQuizAnswer };
};

export default useQuizScore;
