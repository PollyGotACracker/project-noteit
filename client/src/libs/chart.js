import { defaults } from "chart.js";
import { getStyle } from "@utils/manageStyle";

const setChartDefaultStyle = () => {
  defaults.font.family = getStyle("--font-family");
  defaults.font.size = "12";
  defaults.color = getStyle("--subtext");
};

export default setChartDefaultStyle;
