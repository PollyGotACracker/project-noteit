import { useEffect, useRef } from "react";

export const textList = [
  "만나서 정말 반가워요!",
  "힘들면 30분만 쉬기!",
  "오늘도 화이팅!",
  "잘 안되더라도 좌절하지 않기!",
  "조금씩 꾸준히 공부하기!",
  "작은 목표부터 도전하기!",
];

const DashboardTypeText = () => {
  const textNode = useRef(null);
  const timeoutRef = useRef(null);

  const typeWriter = (text) => {
    let i = 0;
    let speed = 0;

    const setNextChar = (char) => {
      textNode.current.insertAdjacentHTML("beforeend", char);
    };
    const setSpeed = (num = 160) => (speed = num);
    const setBlink = (bool) => {
      const value = bool ? "blink" : "none";
      textNode.current.style.animationName = value;
    };
    const typing = () => {
      if (i < text.length) {
        switch (text.charAt(i)) {
          case " ":
            setSpeed();
            setNextChar("\xA0");
            setBlink(false);
            break;
          case ",":
          case ".":
            const rndSpeed = Math.floor(Math.random() * (900 - 500 + 1)) + 500;
            setNextChar(text.charAt(i));
            setSpeed(rndSpeed);
            setBlink(true);
            break;
          default:
            setSpeed();
            setNextChar(text.charAt(i));
            setBlink(false);
        }
        i++;
        timeoutRef.current = setTimeout(typing, speed);
      } else {
        setBlink(true);
      }
    };
    typing();
  };

  useEffect(() => {
    const index = Math.floor(Math.random() * textList.length + 1);
    const msg = textList[index - 1];
    typeWriter(msg);
    return () => {
      textNode.current = "";
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="text-box">
      <span className="text" ref={textNode}></span>
    </div>
  );
};

export default DashboardTypeText;
