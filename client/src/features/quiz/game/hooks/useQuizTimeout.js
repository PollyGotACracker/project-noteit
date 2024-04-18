import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

const useQuizTimeout = ({ gameRef, userAnswerRef }) => {
  const location = useLocation();
  const showResult = useRef(null);
  const showLoading = useRef(null);
  const [isCountStart, setIsCountStart] = useState(false);
  const [countDown, setCountDown] = useState(2000);

  const setCounter = (jumped) => {
    // 넘기기 버튼 클릭 방지
    gameRef.current.style.pointerEvents = "none";
    userAnswerRef.current.disabled = true;
    let msgDelay = jumped ? 0 : 2400;

    showLoading.current = setTimeout(() => {
      setIsCountStart(true);
      showResult.current = setInterval(() => {
        setCountDown((prev) => prev - 1000);
      }, 1000);
    }, msgDelay);
  };

  useEffect(() => {
    if (countDown < 0) {
      clearTimeout(showLoading.current);
      clearInterval(showResult.current);
    }
  }, [countDown]);

  // 다른 페이지로 넘어가면 navigate 실행 방지
  useEffect(() => {
    return () => {
      clearTimeout(showLoading.current);
      clearInterval(showResult.current);
    };
  }, [location.pathname]);

  return { countDown, setCounter, isCountStart };
};

export default useQuizTimeout;
