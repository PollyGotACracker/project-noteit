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

const MultiChart = ({ dates, scores, totalscores, percent }) => {
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
          color: getComputedStyle(document.documentElement).getPropertyValue(
            "--lightalpha"
          ),
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
        label: "백분율",
        type: "line",
        pointStyle: "rectRot",
        data: percent,
        pointRadius: 5,
        pointHoverRadius: 10,
        borderWidth: 1,
        yAxisID: "y1",
        borderColor: getComputedStyle(
          document.documentElement
        ).getPropertyValue("--accent"),
        backgroundColor: getComputedStyle(
          document.documentElement
        ).getPropertyValue("--accentalpha"),
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
        backgroundColor: getComputedStyle(
          document.documentElement
        ).getPropertyValue("--secondary"),
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
        borderColor: getComputedStyle(
          document.documentElement
        ).getPropertyValue("--primary"),
        backgroundColor: getComputedStyle(
          document.documentElement
        ).getPropertyValue("--primaryalpha"),
      },
    ],
  };
  return <Chart options={options} data={data} plugins={[ChartDataLabels]} />;
};

export default MultiChart;
