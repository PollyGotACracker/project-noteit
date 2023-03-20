import { useEffect, useState } from "react";
import { genColor } from "../data/HomeData";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const DoughnutChart = ({ cat, subs, wrongs }) => {
  const [bgColors, setBgColors] = useState([]);

  useEffect(() => {
    const { bg } = genColor({ count: subs.length, alpha: 1 });
    setBgColors([...bg]);
  }, [subs]);

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    layout: {
      padding: 20,
    },
    cutout: "80%",
    plugins: {
      legend: {
        position: "left",
        labels: {
          usePointStyle: true,
          padding: 15,
          font: (context) => {
            const width = context.chart.width;
            const size = Math.round(width / 40);
            return {
              size: size,
            };
          },
        },
      },
      tooltip: {
        displayColors: false,
        // usePointStyle: true,
        titleFont: {
          size: 15,
        },
        bodyFont: {
          size: 14,
        },
        footerFont: {
          size: 14,
        },
      },
      title: {
        display: true,
        text: `${cat} 주제별 누적 오답 수`,
      },
      interaction: {
        mode: "index",
        intersect: false,
      },
    },
  };

  const data = {
    labels: subs,
    datasets: [
      {
        label: "누적 오답 수",
        data: wrongs,
        backgroundColor: bgColors,
        // [
        //   "rgba(255, 99, 132, 0.4)",
        //   "rgba(54, 162, 235, 0.4)",
        //   "rgba(255, 206, 86, 0.4)",
        //   "rgba(75, 192, 192, 0.4)",
        //   "rgba(153, 102, 255, 0.4)",
        //   "rgba(255, 159, 64, 0.4)",
        // ]
        borderColor: getComputedStyle(
          document.documentElement
        ).getPropertyValue("--background"),
        // [
        //   "rgba(255, 99, 132, 1)",
        //   "rgba(54, 162, 235, 1)",
        //   "rgba(255, 206, 86, 1)",
        //   "rgba(75, 192, 192, 1)",
        //   "rgba(153, 102, 255, 1)",
        //   "rgba(255, 159, 64, 1)",
        // ]
        borderWidth: 8,
        hoverOffset: 25,
      },
    ],
  };

  return <Doughnut options={options} data={data} />;
};

export default DoughnutChart;
