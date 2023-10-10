import { useEffect, useRef, useState } from "react";
import typewriteList from "@data/typewriteList";

const DashboardTypewriter = () => {
  const [textValue, setTextValue] = useState("");
  const textNode = useRef(null);
  const timeoutRef = useRef(null);

  const typeWriter = (text) => {
    let i = 0;
    let speed = 0;

    const setNextChar = (char) => {
      setTextValue((prev) => `${prev}${char}`);
    };
    const setSpeed = (num = 160) => (speed = num);
    const setBlink = (node, bool) => {
      const value = bool ? "blink" : "none";
      if (node) node.style.animationName = value;
    };
    const typing = () => {
      if (i < text.length) {
        switch (text.charAt(i)) {
          case " ":
            setSpeed();
            setNextChar("\xA0");
            setBlink(textNode.current, false);
            break;
          case ",":
          case ".":
            const rndSpeed = Math.floor(Math.random() * (900 - 500 + 1)) + 500;
            setNextChar(text.charAt(i));
            setSpeed(rndSpeed);
            setBlink(textNode.current, true);
            break;
          default:
            setSpeed();
            setNextChar(text.charAt(i));
            setBlink(textNode.current, false);
        }
        i++;
        timeoutRef.current = setTimeout(typing, speed);
      } else {
        setBlink(textNode.current, true);
      }
    };
    typing();
  };

  useEffect(() => {
    if (textNode.current) {
      const index = Math.floor(Math.random() * typewriteList.length);
      const msg = typewriteList[index];
      typeWriter(msg);
    }
    return () => {
      setTextValue("");
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [textNode.current]);

  return (
    <div className="text-box">
      <span className="text" ref={textNode}>
        {textValue}
      </span>
    </div>
  );
};

export default DashboardTypewriter;
