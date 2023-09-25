import { defaults } from "chart.js";
import useThemeStyle from "@hooks/useThemeStyle";

const setChartDefaultStyle = () => {
  const [fontFamily, subText] = useThemeStyle(["--font-family", "--subtext"]);

  defaults.font.family = fontFamily;
  defaults.font.size = "12";
  defaults.color = subText;
};

export default setChartDefaultStyle;
