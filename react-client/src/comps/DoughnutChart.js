import { useEffect, useState } from "react";
import { genColor } from "../data/HomeData";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ cat, subs, wrongs }) => {
  const [bgColors, setBgColors] = useState([]);
  const [borderColors, setBorderColors] = useState([]);

  useEffect(() => {
    const { bg, border } = genColor({ count: subs.length, alpha: 0.4 });
    setBgColors([...bg]);
    setBorderColors([...border]);
  }, [subs]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "left",
        labels: {
          usePointStyle: true,
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

        borderColor: borderColors,

        // [
        //   "rgba(255, 99, 132, 1)",
        //   "rgba(54, 162, 235, 1)",
        //   "rgba(255, 206, 86, 1)",
        //   "rgba(75, 192, 192, 1)",
        //   "rgba(153, 102, 255, 1)",
        //   "rgba(255, 159, 64, 1)",
        // ]

        borderWidth: 1,
      },
    ],
  };

  return <Doughnut options={options} data={data} />;
};

export default DoughnutChart;
