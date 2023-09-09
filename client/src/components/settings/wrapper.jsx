const SettingsWrapper = ({ icon, title, children }) => {
  return (
    <section className="setting-box">
      <div className="title">
        {icon}
        {title}
      </div>
      {children}
    </section>
  );
};

export default SettingsWrapper;
