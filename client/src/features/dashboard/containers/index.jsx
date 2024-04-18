import style from "./page.module.css";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useQueries } from "react-query";
import { userState } from "@recoils/user";
import useDashboardFetcher from "../services/useDashboardFetcher";
import Fallback from "@components/fallback/Fallback";
import Summary from "../components/Summary";
import Details from "../components/Details";

export default function Dashboard() {
  const userData = useRecoilValue(userState);

  const getDashboardQueries = useDashboardFetcher();
  const result = useQueries(getDashboardQueries({ userId: userData.u_userid }));
  const isLoading = result.some((query) => query.isLoading);
  const [today, todos, wrongs, scores] = result.map((query) => query.data);

  useEffect(() => {
    const now = new Date();
    const timeUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - now;
    const timeout = setTimeout(() => {
      result.forEach((query) => {
        if (query.refetch) query.refetch();
      });
    }, timeUntilMidnight);

    return () => clearTimeout(timeout);
  }, [result]);

  return (
    <Fallback isLoading={isLoading}>
      <main className={style.dashboard}>
        <div className={style.page_text}>DASHBOARD</div>
        <section className={style.container}>
          <Summary
            today={today}
            recentCategory={wrongs?.category || scores?.category}
          />
          <Details todos={todos} wrongs={wrongs} scores={scores} />
        </section>
      </main>
    </Fallback>
  );
}
