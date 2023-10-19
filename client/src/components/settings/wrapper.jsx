const SettingsWrapper = ({ className, icon, title, children }) => {
  return (
    <section className={`setting-box ${className}`}>
      <div className="title">
        {icon}
        {title}
      </div>
      {children}
    </section>
  );
};

export default SettingsWrapper;
