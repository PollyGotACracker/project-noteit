import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  TimeScale,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { RiLineChartLine } from "react-icons/ri";
import NoStat from "@components/dashboard/noStat";
import useThemeStyle from "@hooks/useThemeStyle";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  TimeScale
);

const DashboardScores = ({ dates, scores, totalscores, percent, error }) => {
  const [accent, accentAlpha, primary, primaryAlpha, secondary, lightAlpha] =
    useThemeStyle([
      "--accent",
      "--accentalpha",
      "--primary",
      "--primaryalpha",
      "--secondary",
      "--lightalpha",
    ]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 10,
    },
    scales: {
      y1: {
        title: {
          display: true,
          text: "백분율(%)",
        },
        type: "linear",
        display: true,
        position: "left",
        min: 0,
        max: 100,
      },
      y: {
        title: {
          display: true,
          text: "점수(점)",
        },
        type: "linear",
        display: true,
        position: "right",
        grid: {
          color: lightAlpha,
        },
      },
    },
    plugins: {
      // ChartDataLabels
      datalabels: {
        align: "end",
        formatter: (value, context) =>
          context.datasetIndex == 0 ? value + "%" : "",
      },
      legend: {
        position: "top",
        labels: {
          padding: 15,
        },
      },
      tooltip: {
        displayColors: false,
        titleFont: {
          size: 15,
        },
        bodyFont: {
          size: 14,
        },
        footerFont: {
          size: 14,
        },
        // usePointStyle: true,
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
    },
  };

  const data = {
    labels: dates,
    datasets: [
      {
        label: "백분율",
        type: "line",
        pointStyle: "rectRot",
        data: percent,
        pointRadius: 5,
        pointHoverRadius: 10,
        borderWidth: 1,
        yAxisID: "y1",
        borderColor: accent,
        backgroundColor: accentAlpha,
      },
      {
        label: "득점",
        type: "line",
        pointStyle: "circle",
        data: scores,
        pointRadius: 5,
        pointHoverRadius: 10,
        borderWidth: 0,
        yAxisID: "y",
        backgroundColor: secondary,
      },
      {
        label: "총점",
        type: "bar",
        pointStyle: "rectRounded",
        data: totalscores,
        barThickness: 40,
        borderWidth: 1,
        borderRadius: 10,
        yAxisID: "y",
        borderColor: primary,
        backgroundColor: primaryAlpha,
      },
    ],
  };

  return (
    <div className="chart-scores">
      <div className="title">
        <RiLineChartLine />
        퀴즈 기록
      </div>
      {error ? (
        <NoStat msg={error} />
      ) : (
        <Chart options={options} data={data} plugins={[ChartDataLabels]} />
      )}
    </div>
  );
};

export default DashboardScores;
