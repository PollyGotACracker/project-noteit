import "@styles/dashboard/dashboard.css";
import { useQueries } from "react-query";
import getDashboardQueries from "@services/dashboard.service";
import setChartDefaultStyle from "@libs/chart";
import TypeText from "@components/dashboard/typeText";
import Todos from "@components/dashboard/todos";
import Article from "@components/dashboard/article";
import Wrongs from "@components/dashboard/wrongs";
import Scores from "@components/dashboard/scores";

const DashboardPage = () => {
  const userId = "polly@gmail.com";
  const [
    { isLoading: todosIsLoading, data: todos },
    { isLoading: wrongsIsLoading, data: wrongs },
    { isLoading: scoresIsLoading, data: scores },
  ] = useQueries(getDashboardQueries(userId));

  setChartDefaultStyle();

  if (!todosIsLoading && !wrongsIsLoading && !scoresIsLoading)
    return (
      <article className="Dashboard">
        <div className="dashboard">DASHBOARD</div>
        <section className="content">
          <section className="top-box">
            <TypeText />
            <div className="subject">
              최근 공부한 노트: {wrongs?.category || "없음"}
            </div>
          </section>
          <Todos todos={todos} />
          {!wrongs?.error && (
            <section className="center-box">
              <Wrongs
                subject={wrongs?.subject}
                wrong={wrongs?.wrong}
                error={wrongs?.error}
              />
              <Article data={wrongs?.article} error={wrongs?.error} />
            </section>
          )}
          <section className="botton-box">
            <Scores
              dates={scores?.date}
              scores={scores?.score}
              totalscores={scores?.totalscore}
              percent={scores?.percent}
              error={scores?.error}
            />
          </section>
        </section>
      </article>
    );
};

export default DashboardPage;
