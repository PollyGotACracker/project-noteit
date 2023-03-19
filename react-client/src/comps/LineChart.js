import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ cat, dates, scores }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "퀴즈 기록",
      },
      interaction: {
        mode: "index",
        intersect: false,
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
        label: cat,
        data: scores,
        borderColor: getComputedStyle(
          document.documentElement
        ).getPropertyValue("--accent"),
        backgroundColor: getComputedStyle(
          document.documentElement
        ).getPropertyValue("--accentalpha"),
      },
      // {
      //   label: "Dataset 2",
      //   data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      //   borderColor: "rgb(53, 162, 235)",
      //   backgroundColor: "rgba(53, 162, 235, 0.5)",
      // },
    ],
  };

  return <Line options={options} data={data} />;
};

export default LineChart;
