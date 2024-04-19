import { useRef, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { keyIdxState, subIdxState } from "../recoils/game";

const useQuizScore = ({ data = [] }) => {
  const subIndex = useRecoilValue(subIdxState);
  const keyIndex = useRecoilValue(keyIdxState);
  const [perfectScore, setPerfectScore] = useState(0);
  const correctList = useRef([]);

  const checkQuizAnswer = (userAnswer) => {
    const answer = userAnswer?.toUpperCase()?.replaceAll(" ", "");
    const isCorrect = correctList.current?.includes(answer);
    return isCorrect;
  };

  useEffect(() => {
    if (data.length !== 0) {
      let score = 0;
      for (let i of data) {
        const keycount = i.s_keycount;
        score += keycount * 5;
      }
      setPerfectScore(score);
    }
  }, [data]);

  // 키워드가 A(B, c) 일 경우 ["A", "B", "C"] 반환
  useEffect(() => {
    const currentKeyStr = data[subIndex]?.tbl_keywords[keyIndex]?.k_keyword;
    correctList.current = currentKeyStr
      ?.toUpperCase()
      ?.replaceAll(" ", "")
      ?.split(/[(,)]/)
      ?.filter((item) => item !== "");
  }, [data, subIndex, keyIndex]);

  return { perfectScore, checkQuizAnswer };
};

export default useQuizScore;
