import { ReactComponent as NoDataSvg } from "@assets/images/no_data.svg";
import useThemeStyle from "@hooks/useThemeStyle";

const SubNoData = () => {
  const primary = useThemeStyle("--primary");

  return (
    <div className="no-data">
      <NoDataSvg className="no-data-img" fill={primary} />
      <div className="no-data-msg">새로운 주제를 만들어보세요!</div>
    </div>
  );
};

export default SubNoData;
