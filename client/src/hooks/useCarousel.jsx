import { useEffect, useReducer, useRef, useState } from "react";
import { checkMobile } from "@utils/getUserAgent";

const useCarousel = ({ ref, list }) => {
  const initPos = -100;
  const keyLength = list?.length;
  const newList = list ? [list.at(-1), ...list, list.at(0)] : [];
  const [position, setPosition] = useState(initPos);
  const animationFrameId = useRef(null);

  const isMobile = useRef(checkMobile());
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const setTransition = (node, bool) =>
    (node.style.transitionProperty = bool ? "transform" : "none");
  const setTransform = (node, pos) =>
    (node.style.transform = `translateX(${pos}%)`);

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

  const touchSlider = (e) => {
    e.preventDefault();
    let touch = null;
    switch (e.type) {
      case "touchstart":
        touch = e.changedTouches[0];
        touchStartX.current = touch.clientX;
        touchEndX.current = 0;
        break;
      case "touchend":
        touch = e.changedTouches[0];
        touchEndX.current = touch.clientX;
        const chkNum = touchStartX.current - touchEndX.current;
        const chkNumAbs = Math.abs(chkNum);
        if (chkNumAbs > 50) {
          if (chkNum < 0) setPrevSlide();
          else setNextSlide();
        }
        break;
    }
  };

  useEffect(() => {
    const setAnimation = () => {
      requestAnimationFrame(() => {
        setTransition(ref.current, true);
        setTransform(ref.current, position);
      });
    };
    animationFrameId.current = requestAnimationFrame(setAnimation);
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [position]);

  useEffect(() => {
    if (!ref.current || !isMobile.current) return;
    const option = {
      passive: false,
    };
    ref.current.addEventListener("touchstart", touchSlider, option);
    ref.current.addEventListener("touchend", touchSlider, option);
    return () => {
      if (ref.current) {
        ref.current.removeEventListener("touchstart", touchSlider, option);
        ref.current.removeEventListener("touchend", touchSlider, option);
      }
    };
  }, [isMobile, ref.current]);

  return {
    newList,
    state,
    setPrevSlide,
    setNextSlide,
    setSelectSlide,
  };
};

export default useCarousel;
