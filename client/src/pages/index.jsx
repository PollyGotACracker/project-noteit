import "@styles/main.css";
import { ReactComponent as Intro } from "@assets/images/intro.svg";

const MainPage = () => {
  // title 에 span tag 추가 후 각각 css animation 설정
  const TitleContent = () => {
    const titleChar = "NoteIT";
    let string = Array.from(titleChar);
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
      <Intro
        className="cover-img"
        fill={getComputedStyle(document.documentElement).getPropertyValue(
          "--secondary"
        )}
      />
      <div className="title">
        <TitleContent />
      </div>
      <div className="subtitle">머리에 들어오는 그 날까지!</div>
    </article>
  );
};

export default MainPage;
