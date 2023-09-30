import { ReactComponent as NoDataSvg } from "@assets/images/no_data.svg";
import { ReactComponent as NoStatSvg } from "@assets/images/no_stat.svg";
import useThemeStyle from "@hooks/useThemeStyle";

const NoContent = ({ isChart = false, msg }) => {
  const primary = useThemeStyle("--primary");

  return (
    <div className="no-content">
      {!isChart ? (
        <NoDataSvg className="no-content-img" fill={primary} />
      ) : (
        <NoStatSvg className="no-content-img" fill={primary} />
      )}
      <span className="no-content-msg">{msg}</span>
    </div>
  );
};

export default NoContent;
