import "@styles/dashboard/dashboard.css";
import { useQueries } from "react-query";
import { useRecoilValue } from "recoil";
import { GiStarsStack } from "react-icons/gi";
import { userState } from "@recoils/user";
import getDashboardQueries from "@services/dashboard.service";
import setChartDefaultStyle from "@libs/chart";
import TypeWriter from "@components/dashboard/typewriter";
import Todos from "@components/dashboard/todos";
import Article from "@components/dashboard/article";
import Wrongs from "@components/dashboard/wrongs";
import Scores from "@components/dashboard/scores";
import Fallback from "@components/fallback";

const DashboardPage = () => {
  const userData = useRecoilValue(userState);
  const result = useQueries(getDashboardQueries(userData.u_userid));
  const isLoading = result.some((query) => query.isLoading);
  const [today, todos, wrongs, scores] = result.map((query) => query.data);

  setChartDefaultStyle();

  return (
    <Fallback isLoading={isLoading}>
      <main className="Dashboard">
        <div className="dashboard">DASHBOARD</div>
        <section className="content">
          <section className="headline">
            <TypeWriter />
            <div className="user-info">
              <div title="점수" className="score">
                <GiStarsStack />
                {userData?.u_score}
              </div>
              <div className="today">
                오늘 하루 <span>{` ${today?.gamecount} `}</span>회의 문제를
                풀고,<span>{` ${today?.todayscore} `}</span>점을 얻었어요.
              </div>
              <div className="subject">
                최근 공부한 노트: {wrongs?.category || scores?.category}
              </div>
            </div>
          </section>
          <section className="details">
            <Todos todos={todos} />
            <Article article={wrongs?.article} error={wrongs?.error} />
            <Wrongs
              subject={wrongs?.wrongs?.subject}
              count={wrongs?.wrongs?.count}
              error={wrongs?.error}
            />
            <Scores
              date={scores?.scores?.date}
              score={scores?.scores?.score}
              totalscore={scores?.scores?.totalscore}
              percent={scores?.scores?.percent}
              error={scores?.error}
            />
          </section>
        </section>
      </main>
    </Fallback>
  );
};

export default DashboardPage;
