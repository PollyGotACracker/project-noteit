import { useEffect, useReducer, useRef, useState } from "react";
import { checkMobile } from "@utils/getUserAgent";

const useCarousel = ({ ref, list }) => {
  const initPos = -100;
  const keyLength = list?.length;
  const newList = list ? [list.at(-1), ...list, list.at(0)] : [];
  const [position, setPosition] = useState(initPos);
  const animationFrameId = useRef(null);

  const isMobile = checkMobile();
  const touchStartX = useRef(0);
  const touchMovedX = useRef(0);
  const touchEndX = useRef(0);

  const setTransition = (node, bool) => {
    if (!node) return;
    node.style.transitionProperty = bool ? "transform" : "none";
  };

  const setTransform = (node, pos, moved) => {
    if (!node) return;
    node.style.transform = moved
      ? `translateX(calc(${pos}% - ${moved}px))`
      : `translateX(${pos}%)`;
  };

  const changeKeyword = (state, action) => {
    switch (action.type) {
      case "PREV":
        if (state > 1) {
          setPosition(position + 100);
          return state - 1;
        }
        if (state === 1) {
          setTransition(ref.current, false);
          if (isMobile) {
            setTransform(
              ref.current,
              (keyLength + 1) * -100,
              touchMovedX.current
            );
          }
          if (!isMobile) {
            setTransform(ref.current, (keyLength + 1) * -100);
          }
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
          if (isMobile) {
            setTransform(ref.current, 0, touchMovedX.current);
          }
          if (!isMobile) {
            setTransform(ref.current, 0);
          }
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

  const setAnimation = () => {
    animationFrameId.current = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTransition(ref.current, true);
        setTransform(ref.current, position);
      });
    });
  };

  const touchSlider = (e) => {
    const touch = e.changedTouches[0];
    switch (e.type) {
      case "touchstart":
        touchStartX.current = touch.clientX;
        touchEndX.current = 0;
        break;
      case "touchmove":
        const width = ref.current.parentNode.offsetWidth;
        const { left, right } = ref.current.parentNode.getBoundingClientRect();
        const moved = touchStartX.current - touch.clientX;
        if (
          touch.clientX > left &&
          touch.clientX < right &&
          Math.abs(moved) < width
        ) {
          touchMovedX.current = moved;
          setTransition(ref.current, false);
          setTransform(ref.current, position, moved);
        }
        break;
      case "touchend":
        touchEndX.current = touch.clientX;
        const chkNum = touchStartX.current - touchEndX.current;
        const chkNumAbs = Math.abs(chkNum);
        if (chkNumAbs > 50) {
          if (chkNum < 0) setPrevSlide();
          else setNextSlide();
        } else {
          setAnimation();
          break;
        }
    }
  };

  useEffect(() => {
    setAnimation();
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [position, animationFrameId.current]);

  useEffect(() => {
    if (!ref.current || !isMobile) return;
    const option = {
      passive: false,
    };
    ref.current.addEventListener("touchstart", touchSlider, option);
    ref.current.addEventListener("touchmove", touchSlider, option);
    ref.current.addEventListener("touchend", touchSlider, option);
    return () => {
      if (ref.current) {
        ref.current.removeEventListener("touchstart", touchSlider, option);
        ref.current.removeEventListener("touchmove", touchSlider, option);
        ref.current.removeEventListener("touchend", touchSlider, option);
      }
    };
  }, [ref.current, position, state]);

  return {
    newList,
    state,
    setPrevSlide,
    setNextSlide,
    setSelectSlide,
  };
};

export default useCarousel;
