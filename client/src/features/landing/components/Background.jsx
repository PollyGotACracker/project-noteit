import style from "./background.module.css";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { starsState } from "../recoils/stars";

export default function Background() {
  const [stars, setStars] = useRecoilState(starsState);
  const resizeFlag = useRef(false);

  const setRndStars = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const COUNT = Math.floor(width * 0.04);

    return Array.from({ length: COUNT }).map(() => {
      const x = Math.floor(Math.random() * width);
      const y = Math.floor(Math.random() * height) * 0.6;
      const size = Math.random() * 4 + 1;
      const duration = Math.random() * 5;
      return {
        width: `${size}px`,
        height: `${size}px`,
        top: `${y}px`,
        left: `${x}px`,
        animationDuration: `${duration + 5}s`,
        animationDelay: `${duration}s`,
      };
    });
  };

  useEffect(() => {
    if (!stars.length) setStars(setRndStars());
  }, [stars]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (resizeFlag.current) return;
      resizeFlag.current = true;

      setTimeout(() => {
        setStars(setRndStars());
        resizeFlag.current = false;
      }, 100);
    });
  }, [resizeFlag.current]);

  return (
    <div className={style.container}>
      {stars.map((addStyle, index) => (
        <div className={style.star} key={index} style={addStyle}></div>
      ))}
    </div>
  );
}
