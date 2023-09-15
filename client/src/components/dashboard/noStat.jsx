import { getStyle } from "@utils/manageStyle";
import { ReactComponent as NoStatSvg } from "@assets/images/no_stat.svg";

const DashboardNoStat = ({ msg }) => {
  return (
    <div>
      <NoStatSvg className="no-stat-img" fill={getStyle("--primary")} />
      <div className="no-stat-msg">{msg}</div>
    </div>
  );
};

export default DashboardNoStat;
