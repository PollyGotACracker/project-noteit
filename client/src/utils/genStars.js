const genStars = (node) => {
  let width = window.innerWidth;
  let height = window.innerHeight;

  const setRndStars = () => {
    node.textContent = "";
    const COUNT = Math.floor(width * 0.04);
    const stars = [];
    let i = 0;
    while (i < COUNT) {
      const star = document.createElement("DIV");
      star.className = "star";
      const x = Math.floor(Math.random() * width);
      const y = Math.floor(Math.random() * height);
      const size = Math.random() * 4 + 1;
      const duration = Math.random() * 5;
      Object.assign(star.style, {
        width: size + "px",
        height: size + "px",
        top: y + "px",
        left: x + "px",
        animationDuration: duration + 5 + "s",
        animationDelay: duration + "s",
      });
      stars.push(star);
      i++;
    }
    node.append(...stars);
  };

  setRndStars();

  window.addEventListener("resize", () => {
    width = window.innerWidth;
    height = window.innerHeight;
    setRndStars();
  });
};

export default genStars;
/**
 * cf)
 * DOM style Object
 * Object.assign 을 이용하여 대상 객체의 동일 키를 갖는 속성에 값을 덮어쓸 수 있다.
 * Object.assign(target, ...sources)
 * */
