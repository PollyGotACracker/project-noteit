import { ReactComponent as NoStatSvg } from "@assets/images/no_stat.svg";

const DashboardNoStat = ({ msg }) => {
  return (
    <div>
      <NoStatSvg
        className="no-stat-img"
        fill={getComputedStyle(document.documentElement).getPropertyValue(
          "--primary"
        )}
      />
      <div className="no-stat-msg">{msg}</div>
    </div>
  );
};

export default DashboardNoStat;
