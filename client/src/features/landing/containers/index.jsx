import style from "./page.module.css";
import { ReactComponent as Noteit } from "@assets/images/noteit_cover.svg";
import { ReactComponent as Lighthouse } from "@assets/images/lighthouse.svg";
import { useEffect } from "react";
import useThemeStyle from "@hooks/useThemeStyle";
import Background from "../components/Background";

export default function Landing() {
  const [secondary, accentalpha] = useThemeStyle([
    "--secondary",
    "--accentalpha",
  ]);

  useEffect(() => {
    const logoRects = document.querySelectorAll("svg rect");
    let keyframes = [];
    const options = {
      duration: 1000,
      fill: "both",
      easing: "ease-in-out",
    };

    logoRects.forEach((rect, idx) => {
      const rectRotate = rect.getAttribute("transform");
      if (rectRotate) {
        let [rotate, originX, originY] =
          rectRotate?.match(/-?\b\d+(\.\d+)?\b/g);
        rect.style.transformOrigin = `${originX}px ${originY}px`;
        keyframes = [
          { transform: `rotate(${rotate}deg) scaleX(0)` },
          { transform: `rotate(${rotate}deg) scaleX(1)` },
        ];
        rect.animate(keyframes, { ...options, delay: idx * 200 });
      }
    });
  }, []);

  return (
    <main className={style.main}>
      <div className={style.logo_box}>
        <div className={style.logo_wrapper}>
          <Noteit className={style.logo_image} fill={secondary} />
        </div>
        <div className={style.title}>NoteIT</div>
        <div className={style.description}>스스로 정리하고 학습하기</div>
      </div>
      <Lighthouse className={style.lighthouse_image} fill={accentalpha} />
      <Background />
    </main>
  );
}
