import { useEffect, useReducer, useRef, useState } from "react";

const useCarousel = ({ ref, list }) => {
  const initPos = -100;
  const keyLength = list?.length;
  const newList = list ? [list.at(-1), ...list, list.at(0)] : [];
  const [position, setPosition] = useState(initPos);
  const animationFrameId = useRef(null);

  const setTransition = (node, bool) =>
    (node.style.transitionProperty = bool ? "transform" : "none");
  const setTransform = (node, pos) =>
    (node.style.transform = `translateX(${pos}%)`);

  useEffect(() => {
    const setAnimation = () => {
      setTransition(ref.current, true);
      setTransform(ref.current, position);
    };
    animationFrameId.current = requestAnimationFrame(setAnimation);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [position]);

  const changeKeyword = (state, action) => {
    switch (action.type) {
      case "PREV":
        if (state > 1) {
          setPosition(position + 100);
          return state - 1;
        }
        if (state === 1) {
          setTransition(ref.current, false);
          setTransform(ref.current, (keyLength + 1) * -100);
          setPosition(keyLength * -100);
          return keyLength;
        }
      case "NEXT":
        if (state < keyLength) {
          setPosition(position - 100);
          return state + 1;
        }
        if (state === keyLength) {
          setTransition(ref.current, false);
          setTransform(ref.current, 0);
          setPosition(initPos);
          return 1;
        }
      case "SELECT": {
        setPosition(action.select * -100);
        return action.select;
      }
      default: {
        setPosition(position);
        return state;
      }
    }
  };

  const [state, dispatch] = useReducer(changeKeyword, 1);
  const setPrevSlide = () => dispatch({ type: "PREV" });
  const setNextSlide = () => dispatch({ type: "NEXT" });
  const setSelectSlide = (id) => dispatch({ type: "SELECT", select: id });

  return {
    newList,
    state,
    setPrevSlide,
    setNextSlide,
    setSelectSlide,
  };
};

export default useCarousel;

/**
 * cf)
 * React 에서 캐러셀 만들기
 * JSX 에서 style transform 을 직접 적용하거나,
 * transition 값을 한 블록 내에서 여러 번 적용하면
 * 처음 및 마지막 이미지에서 넘길 때 transition 에 문제가 발생
 * ==> useEffect 를 사용해 position 이 변한 직후 transition 및 transform 적용 후,
 * requestAnimationFrame 으로 스타일 변경 비동기 처리
 * 단, [마지막 이미지 ...실제 이미지 리스트, 첫 이미지] 일 경우
 * JS 가 아닌 CSS 에서 초기 transform 값을 지정하여
 * 페이지 첫 로드 시에 불필요한 transition 발생 방지 필요
 */
