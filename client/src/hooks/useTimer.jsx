import { useState, useEffect, useRef } from "react";

const useTimer = (seconds) => {
  const intervalId = useRef(null);

  const formatTimer = (count) => {
    const getPaddedNumber = (num) => String(num).padStart(2, "0");

    const hours = Math.floor(count / 3600);
    const minutes = Math.floor((count % 3600) / 60);
    const remainingSeconds = count % 60;

    const paddedHours = getPaddedNumber(hours);
    const paddedMinutes = getPaddedNumber(minutes);
    const paddedSeconds = getPaddedNumber(remainingSeconds);

    if (seconds >= 3600) {
      return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
    }
    if (seconds >= 60) {
      return `${paddedMinutes}:${paddedSeconds}`;
    }
    return paddedSeconds;
  };

  const [count, setCount] = useState(seconds);
  const [timer, setTimer] = useState(formatTimer(seconds));

  const startTimer = (delay = 1) => {
    intervalId.current = setTimeout(function descCount() {
      setCount((count) => {
        if (count === 0) {
          clearTimer();
          return 0;
        }
        return count - 1;
      });
      intervalId.current = setTimeout(descCount, 1000);
    }, delay * 1000);
  };

  const pauseTimer = () => {
    if (intervalId.current) clearTimeout(intervalId.current);
  };

  const clearTimer = () => {
    pauseTimer();
    setCount(seconds);
  };

  useEffect(() => {
    const value = formatTimer(count);
    setTimer(value);
  }, [count]);

  return { count, timer, startTimer, pauseTimer, clearTimer };
};

export default useTimer;
