import "@styles/landing/landing.css";
import { ReactComponent as Landing } from "@assets/images/landing.svg";
import { ReactComponent as Lighthouse } from "@assets/images/lighthouse.svg";
import { getStyle } from "@utils/manageStyle";
import useThemeStyle from "@hooks/useThemeStyle";

const LandingPage = () => {
  const secondary = useThemeStyle("--secondary");

  // title 에 span tag 추가 후 각각 css animation 설정
  const TitleContent = () => {
    const title = "NoteIT";
    let string = Array.from(title);
    let content = string.map((char, index) => {
      // 1 은 cover-img 의 animation duration
      const DURATION = 0.3;
      const delay = 1 + DURATION * Number(index);
      return (
        <span
          className="char"
          key={index}
          style={{
            animationDuration: `${DURATION}s`,
            animationDelay: `${delay}s`,
          }}
        >
          {char === " " ? "\u2002" : char}
        </span>
      );
    });
    return content;
  };

  return (
    <main className="Landing">
      <Landing className="cover-img" fill={secondary} />
      <div className="title">
        <TitleContent />
      </div>
      <div className="subtitle">스스로 정리하고 학습하기</div>
      <Lighthouse className="lighthouse-img" fill={getStyle("--accentalpha")} />
    </main>
  );
};

export default LandingPage;
