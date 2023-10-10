import "@styles/dashboard/wrongs.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { RiDonutChartFill } from "react-icons/ri";
import genColor from "@utils/genColor";
import useThemeStyle from "@hooks/useThemeStyle";
import NoContent from "@components/noContent";
import { useEffect } from "react";
import { useState } from "react";
import setChartDefaultStyle from "@libs/chart";

const DashboardWrongs = ({ subject = [], count = [], error }) => {
  ChartJS.register(ArcElement, Tooltip, Legend, Title);
  const getLabelPos = () => {
    const width = window.innerWidth;
    const value = width >= 600 ? "right" : "top";
    return value;
  };
  const isNoData = subject?.length === 0;
  const allCount = count?.reduce((acc, cur) => acc + Number(cur), 0);
  const bgList = genColor({ count: subject?.length, alpha: 1 });
  const background = useThemeStyle("--background");
  const [labelPos, setLabelPos] = useState(getLabelPos());

  useEffect(() => {
    const resetLabelPos = () => setLabelPos(getLabelPos());
    window.addEventListener("resize", resetLabelPos);
    return () => {
      window.removeEventListener("resize", resetLabelPos);
    };
  }, []);
  setChartDefaultStyle();
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",

    plugins: {
      title: {
        display: true,
        text: `총 오답 횟수: ${allCount || 0}`,
        align: "center",
        font: { size: 16 },
        padding: {
          bottom: 30,
        },
      },
      legend: {
        position: labelPos,
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 15,
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
        data: count,
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
        자주 틀리는 주제
      </div>
      {error ? (
        <NoContent isChart={true} msg={error} />
      ) : isNoData ? (
        <NoContent isChart={true} msg={"북마크된 주제가 없습니다."} />
      ) : (
        <div className="chart-container">
          <Doughnut options={options} data={data} />
        </div>
      )}
    </div>
  );
};

export default DashboardWrongs;
