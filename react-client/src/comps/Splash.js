import "../css/Splash.css";

const Splash = () => {
  const onClickHandler = (e) => {
    window.location.replace("/home");
  };

  return (
    <main className="Splash" onClick={onClickHandler}>
      <div className="cover-img"></div>
      <div className="title">앵알앵알 단어교실</div>
      <div className="greeting">아무 곳이나 클릭하세요!</div>
    </main>
  );
};

export default Splash;
