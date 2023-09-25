import "@styles/landing.css";
import { ReactComponent as Intro } from "@assets/images/intro.svg";
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
    <article className="Main">
      <Intro className="cover-img" fill={secondary} />
      <div className="title">
        <TitleContent />
      </div>
      <div className="subtitle">머리에 들어오는 그 날까지!</div>
    </article>
  );
};

export default LandingPage;
