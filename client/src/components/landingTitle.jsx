const LandingTitle = ({ title }) => {
  // title 에 span tag 추가 후 각각 css animation 설정
  const string = Array.from(title);
  const content = string.map((char, index) => {
    // 0.5 : cover-img 의 animation duration
    const DURATION = 0.3;
    const delay = 0.5 + DURATION * Number(index);
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

export default LandingTitle;
