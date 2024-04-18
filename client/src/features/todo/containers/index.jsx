import style from "./page.module.css";
import Progress from "../components/Progress";
import Form from "../components/Form";
import List from "../components/List";

export default function Todo() {
  return (
    <main className={style.main}>
      <Progress />
      <Form />
      <List />
    </main>
  );
}
