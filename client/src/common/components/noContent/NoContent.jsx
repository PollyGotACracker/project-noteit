import style from "./noContent.module.css";
import { ReactComponent as NoDataSvg } from "@assets/images/no_data.svg";
import { ReactComponent as NoStatSvg } from "@assets/images/no_stat.svg";
import useThemeStyle from "@hooks/useThemeStyle";
import cx from "classnames";

export default function NoContent({ isChart = false, isFull = false, msg }) {
  const primary = useThemeStyle("--primary");

  return (
    <div className={cx(style.no_content, { [style.full]: isFull })}>
      <div className={style.image_wrapper}>
        {!isChart ? (
          <NoDataSvg className={style.image} fill={primary} />
        ) : (
          <NoStatSvg className={style.image} fill={primary} />
        )}
      </div>
      <p className={style.description}>{msg}</p>
    </div>
  );
}
