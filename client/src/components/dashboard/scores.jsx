import "@styles/dashboard/scores.css";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  TimeScale,
  Filler,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { RiLineChartLine } from "react-icons/ri";
import useThemeStyle from "@hooks/useThemeStyle";
import NoContent from "@components/noContent";
import setChartDefaultStyle from "@libs/chart";

const DashboardScores = ({
  date = [],
  score = [],
  totalscore = [],
  percent = [],
  error,
}) => {
  ChartJS.register(
    LinearScale,
    CategoryScale,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    TimeScale,
    Filler
  );

  const [accent, accentAlpha, borderalpha] = useThemeStyle([
    "--accent",
    "--accentalpha",
    "--borderalpha",
  ]);
  setChartDefaultStyle();
  const options = {
    layout: {
      padding: {
        top: 25,
        right: 20,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        reverse: true,
        ticks: { display: false },
        grid: {
          color: borderalpha,
        },
      },
      y: {
        type: "linear",
        display: true,
        position: "left",
        min: 0,
        max: 100,
        grid: {
          color: borderalpha,
        },
      },
    },
    plugins: {
      datalabels: {
        align: "end",
        formatter: (value, context) =>
          context.datasetIndex == 0 ? value + "%" : "",
      },
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            const dataPoint = tooltipItems[0];
            const dataIndex = dataPoint.dataIndex;
            return date[dataIndex];
          },
          footer: (tooltipItems) => {
            const dataPoint = tooltipItems[0];
            const dataIndex = dataPoint.dataIndex;
            const value = `${score[dataIndex]} / ${totalscore[dataIndex]}`;
            return `득점: ${value}`;
          },
        },
        displayColors: false,
        titleFont: {
          size: 12,
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
    labels: date,
    datasets: [
      {
        label: "백분율",
        type: "line",
        pointStyle: "rectRot",
        data: percent,
        pointRadius: 5,
        pointHoverRadius: 10,
        borderWidth: 1,
        borderColor: accent,
        backgroundColor: accentAlpha,
        fill: true,
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
        <NoContent isChart={true} msg={error} />
      ) : (
        <div className="chart-container">
          <Chart options={options} data={data} plugins={[ChartDataLabels]} />
        </div>
      )}
    </div>
  );
};

export default DashboardScores;
