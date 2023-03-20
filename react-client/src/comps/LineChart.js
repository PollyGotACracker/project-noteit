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
  Title,
} from "chart.js";
import { Chart } from "react-chartjs-2";

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
  Title
);

const LineChart = ({ cat, dates, scores, totalscores }) => {
  const footer = function (tooltipItems) {
    return tooltipItems.yLabel;
    // console.log(context);
    // console.log(context.chart);
    // console.log(context.label);
    // console.log(context.parsed);
    // console.log(context.raw);
    // console.log(context.formattedValue);
    // console.log(context.dataset);
    // console.log(context.datasetIndex);
    // console.log(context.dataIndex);
    // console.log(context.element);
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 20,
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          // usePointStyle: true,
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
      title: {
        display: true,
        text: "퀴즈 기록",
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
    },
  };

  /**
   * cf)
   * css var 변수 값 가져오기
   * getComputedStyle(document.documentElement)
   *  .getPropertyValue('--variable-name');
   *
   * css var 변수 값 세팅하기
   * document.documentElement.style
   *  .setProperty('--variable-name', 'black');
   */
  const data = {
    labels: dates,
    datasets: [
      {
        label: "득점",
        type: "line",
        pointStyle: "circle",
        data: scores,
        pointRadius: 5,
        pointHoverRadius: 10,
        borderWidth: 1,
        borderColor: getComputedStyle(
          document.documentElement
        ).getPropertyValue("--accent"),
        backgroundColor: getComputedStyle(
          document.documentElement
        ).getPropertyValue("--accentalpha"),
      },
      {
        label: "총점",
        type: "bar",
        pointStyle: "rectRounded",
        data: totalscores,
        barThickness: 50,
        borderWidth: 1,
        borderColor: getComputedStyle(
          document.documentElement
        ).getPropertyValue("--primary"),
        backgroundColor: getComputedStyle(
          document.documentElement
        ).getPropertyValue("--primaryalpha"),
      },
    ],
  };

  return <Chart options={options} data={data} />;
};

export default LineChart;
