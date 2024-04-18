import style from "./settingBox.module.css";
import cx from "classnames";

export default function SettingBox({
  icon,
  title,
  isColumn = false,
  isDanger = false,
  children,
}) {
  return (
    <section className={cx(style.setting_box, { [style.column]: isColumn })}>
      <div className={cx(style.title, { [style.danger]: isDanger })}>
        {icon}
        <span>{title}</span>
      </div>
      {children}
    </section>
  );
}
