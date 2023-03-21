import "../css/Main.css";
import { ReactComponent as Intro } from "../assets/images/intro.svg";

const Main = () => {
  // title 에 span tag 추가 후 각각 css animation 설정
  const TitleContent = () => {
    const titleChar = "NoteIT";
    let string = Array.from(titleChar);

    let content = string.map((char, index) => {
      // 1 은 cover-img 의 animation duration
      const duration = 0.3;
      const delay = 1 + duration * Number(index);
      return (
        <span
          className="char"
          key={index}
          style={{
            animationDuration: `${duration}s`,
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
    </article>
  );
};

export default Main;
