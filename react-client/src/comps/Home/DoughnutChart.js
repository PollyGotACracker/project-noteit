import { useEffect, useState } from "react";
import { genColor } from "../../data/HomeData";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { RiDonutChartFill } from "react-icons/ri";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ subs, wrongs }) => {
  const [bgColors, setBgColors] = useState([]);

  useEffect(() => {
    const { bg } = genColor({ count: subs.length, alpha: 1 });
    setBgColors([...bg]);
  }, [subs]);

  const options = {
    responsive: true,
    maintainAspectRatio: true,
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
        borderColor: getComputedStyle(
          document.documentElement
        ).getPropertyValue("--background"),
        borderWidth: 8,
        hoverOffset: 25,
      },
    ],
  };

  return (
    <div className="chart-wrong">
      <div className="title">
        <RiDonutChartFill />
        주제별 오답 순위
      </div>
      <Doughnut options={options} data={data} />
    </div>
  );
};

export default DoughnutChart;
