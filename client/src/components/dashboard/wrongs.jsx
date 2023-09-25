import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { RiDonutChartFill } from "react-icons/ri";
import genColor from "@utils/genColor";
import useThemeStyle from "@hooks/useThemeStyle";

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardWrongs = ({ subject, wrong, error }) => {
  const bgList = genColor({ count: subject?.length, alpha: 1 });
  const background = useThemeStyle("--background");

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: "70%",
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
    labels: subject,
    datasets: [
      {
        label: "누적 오답 횟수",
        data: wrong,
        backgroundColor: bgList,
        borderColor: background,
        borderWidth: 8,
        hoverOffset: 15,
        hoverBorderWidth: 8,
      },
    ],
  };

  return (
    <div className="chart-wrongs">
      <div className="title">
        <RiDonutChartFill />
        주제별 오답 순위
      </div>
      {error ? (
        <NoStat msg={error} />
      ) : (
        <Doughnut options={options} data={data} />
      )}
    </div>
  );
};

export default DashboardWrongs;
