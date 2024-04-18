import style from "./details.module.css";
import Todos from "./Todos";
import Article from "./Article";
import Wrongs from "./Wrongs";
import Scores from "./Scores";

export default function Details({ todos, wrongs, scores }) {
  return (
    <section className={style.details}>
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
  );
}
