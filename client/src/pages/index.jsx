import "@styles/landing/landing.css";
import { ReactComponent as Noteit } from "@assets/images/noteit_cover.svg";
import { ReactComponent as Lighthouse } from "@assets/images/lighthouse.svg";
import { useEffect, useRef } from "react";
import useThemeStyle from "@hooks/useThemeStyle";
import StarContainer from "@/components/starContainer";

const LandingPage = () => {
  const [secondary, accentalpha] = useThemeStyle([
    "--secondary",
    "--accentalpha",
  ]);

  useEffect(() => {
    const coverRects = document.querySelectorAll(".cover rect");
    let keyframes = [];
    const options = {
      duration: 1000,
      fill: "both",
      easing: "ease-in-out",
    };

    coverRects.forEach((rect, idx) => {
      const rectRotate = rect.getAttribute("transform");
      let [rotate, originX, originY] = rectRotate.match(/-?\b\d+(\.\d+)?\b/g);
      rect.style.transformOrigin = `${originX}px ${originY}px`;
      keyframes = [
        { transform: `rotate(${rotate}deg) scaleX(0)` },
        { transform: `rotate(${rotate}deg) scaleX(1)` },
      ];
      rect.animate(keyframes, { ...options, delay: idx * 200 });
    });
  }, []);

  return (
    <main className="out Landing">
      <div className="cover-wrapper">
        <div className="cover-img">
          <Noteit fill={secondary} className="cover" />
        </div>
        <div className="title">NoteIT</div>
        <div className="subtitle">스스로 정리하고 학습하기</div>
      </div>
      <Lighthouse className="lighthouse-img" fill={accentalpha} />
      <StarContainer />
    </main>
  );
};

export default LandingPage;

/**
 * svg tranform 은 svg 속성이기 때문에 getAttribute() 로 값을 가져와야 함
 * fill-mode 를 both 로 설정하면 keyframe tranform 스타일이 svg tranform 속성을 덮어쓰는 문제 발생
 * svg tranform 의 rotate() 는 rotate transformOriginX tranformOriginY 로 이루어져 있음
 *
 * cf) \b: 단어 경계(단어 문자와 그렇지 않은 문자 사이의 경계 탐색)
 * 여기서 단어는 알파벳, 숫자, underbar 로 구성된 문자열
 */
