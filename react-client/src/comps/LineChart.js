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
  BarController
);

const LineChart = ({ cat, dates, scores, totalscores }) => {
  const footer = function (context) {
    console.log(context.chart);

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
    plugins: {
      legend: {
        position: "top",
        labels: {
          // usePointStyle: true,
        },
      },
      tooltip: {
        // usePointStyle: true,
        // callbacks: {
        //   title: (context) => context[0].label,
        //   label: (context) => {
        //   },
        // },
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
        data: scores,
        pointStyle: "circle",
        pointRadius: 10,
        pointHoverRadius: 15,
        borderWidth: 2,
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
        data: totalscores,
        borderWidth: 2,
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
