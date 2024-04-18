import style from "./toast.module.css";
import { useEffect, useRef } from "react";
import { RxCross2 } from "react-icons/rx";

export default function Toast({ isShowed, onClose, text }) {
  const targetRef = useRef(null);
  const initialHeight = useRef(window.innerHeight);

  useEffect(() => {
    setTimeout(onClose, 8000);
  }, []);

  useEffect(() => {
    visualViewport.addEventListener("resize", (e) => {
      if (!targetRef.current) return;
      const toast = targetRef.current.parentElement;
      const keyboardHeight = initialHeight.current - e.target.height;
      if (keyboardHeight > 0) {
        toast.style.bottom = `${keyboardHeight}px`;
      } else {
        toast.style.bottom = `0`;
      }
    });
  }, []);

  if (isShowed) {
    return (
      <>
        <p>{text}</p>
        <button ref={targetRef} className={style.close} onClick={onClose}>
          <RxCross2 />
        </button>
      </>
    );
  }
}
