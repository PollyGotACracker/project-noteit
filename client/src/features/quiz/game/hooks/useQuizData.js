import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { subIndexState, keyIndexState } from "../recoils/game";

const useQuizData = ({ data = [] }) => {
  const subIndex = useRecoilValue(subIndexState);
  const keyIndex = useRecoilValue(keyIndexState);
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    if (!!data.length) setQuizData([...data]);
  }, [data]);

  const actionType = {
    CORRECT: "CORRECT",
    WRONG: "WRONG",
    SKIP_SUB: "SKIP_SUB",
    SKIP_KEY: "SKIP_KEY",
  };

  const condition = {
    isCorrect: (type, index, targetIndex) =>
      type === actionType.CORRECT && index === targetIndex,
    isWrong: (type, index, targetIndex) =>
      type === actionType.WRONG && index === targetIndex,
    isSubSkip: (type, index, targetIndex) =>
      type === actionType.SKIP_SUB && index >= targetIndex,
    isKeySkip: (type, index, targetIndex) =>
      type === actionType.SKIP_KEY && index === targetIndex,
  };

  const updateQuizData = ({ type, userAnswer = "건너뛴 문제입니다." }) => {
    const _quizData = [...quizData];
    _quizData.forEach((subject, index) => {
      if (index === subIndex) {
        subject.tbl_keywords.forEach((keyword, index) => {
          const args = [type, index, keyIndex];
          if (condition.isCorrect(...args)) {
            keyword.isCorrect = true;
            keyword.userAnswer = userAnswer;
          }
          if (
            condition.isWrong(...args) ||
            condition.isSubSkip(...args) ||
            condition.isKeySkip(...args)
          ) {
            keyword.isCorrect = false;
            keyword.userAnswer = userAnswer;
          }
          return keyword;
        });
      }
      return subject;
    });

    setQuizData([..._quizData]);
  };

  const getWrongData = () => {
    return quizData.reduce((acc, subject) => {
      const wrongs = subject.tbl_keywords.filter(
        (keyword) => !keyword.isCorrect
      );
      return !!wrongs.length ? [...acc, { ...subject, wrongs }] : acc;
    }, []);
  };

  return { actionType, updateQuizData, getWrongData };
};

export default useQuizData;
