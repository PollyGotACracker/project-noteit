import "../css/Sidebar.css";

const Sidebar = () => {
  return (
    <section className="Sidebar">
      <div className="profile-img">
        <img />
      </div>
      <div className="profile-str">
        <span>{}</span>
      </div>
      <div className="point">
        POINT
        <span>{}</span>
      </div>
    </section>
  );
};

export default Sidebar;
