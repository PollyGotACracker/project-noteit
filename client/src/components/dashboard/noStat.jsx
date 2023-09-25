import { ReactComponent as NoStatSvg } from "@assets/images/no_stat.svg";
import useThemeStyle from "@hooks/useThemeStyle";

const DashboardNoStat = ({ msg }) => {
  const primary = useThemeStyle("--primary");

  return (
    <div>
      <NoStatSvg className="no-stat-img" fill={primary} />
      <div className="no-stat-msg">{msg}</div>
    </div>
  );
};

export default DashboardNoStat;
