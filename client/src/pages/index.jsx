import "@styles/landing/landing.css";
import { ReactComponent as Noteit } from "@assets/images/noteit_cover.svg";
import { ReactComponent as Lighthouse } from "@assets/images/lighthouse.svg";
import { useEffect, useRef } from "react";
import genStars from "@utils/genStars";
import useThemeStyle from "@hooks/useThemeStyle";
import LandingTitle from "@components/landingTitle";

const LandingPage = () => {
  const [secondary, accentalpha] = useThemeStyle([
    "--secondary",
    "--accentalpha",
  ]);
  const starsRef = useRef(null);

  useEffect(() => {
    if (starsRef.current) genStars(starsRef.current);
  }, [starsRef.current]);

  return (
    <main className="out Landing">
      <div className="cover-img">
        <Noteit fill={secondary} />
      </div>
      <div className="title">
        <LandingTitle title="NoteIT" />
      </div>
      <div className="subtitle">스스로 정리하고 학습하기</div>
      <Lighthouse className="lighthouse-img" fill={accentalpha} />
      <div className="stars-container" ref={starsRef}></div>
    </main>
  );
};

export default LandingPage;
