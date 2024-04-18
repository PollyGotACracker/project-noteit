import style from "./summary.module.css";
import { useRecoilValue } from "recoil";
import { GiStarsStack } from "react-icons/gi";
import { userState } from "@recoils/user";
import TypeWriter from "../components/Typewriter";

export default function Summary({ today, recentCategory }) {
  const userData = useRecoilValue(userState);

  return (
    <section className={style.summary}>
      <TypeWriter profileStr={userData?.u_profilestr} />
      <div className={style.user_info}>
        <div title="점수" className={style.score}>
          <GiStarsStack />
          <span>{userData?.u_score}</span>
        </div>
        <div className={style.today}>
          <div>
            오늘 하루 <span>{today?.gamecount || 0}</span>회의 문제를 풀고
          </div>
          <div>
            <span>{today?.todayscore || 0}</span>점을 얻었어요.
          </div>
        </div>
        <div className={style.subject}>최근 공부한 노트: {recentCategory}</div>
      </div>
    </section>
  );
}
