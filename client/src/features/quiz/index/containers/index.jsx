import style from "./page.module.css";
import { useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import { userState } from "@recoils/user";
import useGameFetcher from "../services/useGameFetcher";
import Timer from "../components/Timer";
import Item from "../components/Item";
import cx from "classnames";

export default function QuizIndex() {
  const { getQuizCategories } = useGameFetcher();
  const userData = useRecoilValue(userState);
  const { data: quizCatList } = useQuery(
    getQuizCategories({ userId: userData.u_userid })
  );

  return (
    <main>
      <div className={style.head}>
        <span>노트 이름</span>
        <span>마지막 퀴즈 날짜</span>
        <span>주제 수</span>
        <span>키워드 수</span>
      </div>
      <section className={cx(style.list, style.overflow, style.full)}>
        {quizCatList?.map((item) => (
          <Item key={item.c_catid} item={item} />
        ))}
      </section>
      <Timer />
    </main>
  );
}
