import "../../css/Set/Set.css";

const Set = () => {
  return (
    <main className="Setting">
      <section className="setting-box">
        <div className="wrapper">
          <div className="title">배경음악</div>
          <button className="music-btn"></button>
        </div>
        <div className="wrapper">
          <div className="title">PUSH 알림</div>
          <label htmlFor="push"></label>
          <input type="checkbox" id="push" value="1" name="push" />
        </div>
        <div className="wrapper">
          <div className="title">테마</div>
          <div className="theme-box">
            <label htmlFor="light">light</label>
            <input type="radio" id="light" value="light" name="theme" />
            <label htmlFor="dark">dark</label>
            <input type="radio" id="dark" value="dark" name="theme" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Set;
