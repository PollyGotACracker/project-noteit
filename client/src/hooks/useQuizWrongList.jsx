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

  const setIsNewSub = (wrongs) => {
    const lastSub = wrongs.at(-1)?.s_subid;
    const currentSub = subjectList[subIndex]?.s_subid;
    const isNoPrevSub = wrongs.length === 0;
    const isDiffSub = wrongs.length !== 0 && lastSub !== currentSub;
    if (isNoPrevSub || isDiffSub) {
      const newSubData = {
        ...subjectList[subIndex],
        wrong: [],
      };
      delete newSubData.tbl_keywords;
      wrongs = [...wrongs, newSubData];
      return wrongs;
    }
    return wrongs;
  };

  const setIfSingleKey = ({ wrongs, state, answer }) => {
    const isKeyWrong = state === "wrong" || state === "nextKey";
    if (isKeyWrong) {
      const prevWrongs = wrongs.at(-1)?.wrong;
      const keyData = { ...keywordList[keyIndex], answer: answer };
      wrongs.at(-1).wrong = [...prevWrongs, keyData];
      return wrongs;
    }
    return wrongs;
  };

  const setIfMultipleKeys = ({ wrongs, state, answer }) => {
    const isKeysWrong = state === "nextSub";
    if (isKeysWrong) {
      const prevWrongs = wrongs.at(-1)?.wrong;
      const keyData = keywordList
        ?.filter((_, index) => index >= keyIndex)
        ?.map((item) => (item = { ...item, answer: answer }));
      wrongs.at(-1).wrong = [...prevWrongs, ...keyData];
      return wrongs;
    }
    return wrongs;
  };

  const addWrongItem = ({ state, answer = "건너뛴 문제입니다." }) => {
    const valids = ["correct", "wrong", "nextSub", "nextKey"];
    if (!valids.includes(state))
      throw new Error(`state 값은 다음 중 하나여야 합니다: ${valids}`);

    let newWrongs = [...wrongAnswer];
    // 만약 새로운 주제라면 추가 후 다음 조건으로 이동
    newWrongs = setIsNewSub(newWrongs);
    newWrongs = setIfSingleKey({ wrongs: newWrongs, state, answer });
    newWrongs = setIfMultipleKeys({ wrongs: newWrongs, state, answer });

    setWrongAnswer([...newWrongs]);
  };

  return { wrongAnswer, addWrongItem };
};

export default useQuizWrongList;

/**
 * cf)
 * 컴포넌트에서는 문제가 없다가 custom hook 으로 만든 후
 * addWrongItem 가 호출될 때 addWrongItem 은 한번 실행되지만,
 * useState 의 setter 함수 setWrongAnswer 가 두 번씩 실행되는 문제 발생
 * 1. memoization 으로 해결되지 않음
 * 2. 컴포넌트로 다시 옮기면 다시 정상적으로 실행됨
 * 3. custom hook 에 작성한 상태에서, <React.StrictMode> 를 끄니 문제 발생 X
 * ==> setWrongAnswer((prev)=>{return ...}) 하지 않고 setWrongAnswer([...]) 로 변경 시 해결됨
 * !!! 하지만 왜 컴포넌트에서는 문제 없이 실행되었는지 모르겠음
 */
