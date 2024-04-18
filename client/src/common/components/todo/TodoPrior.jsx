import style from "./todoPrior.module.css";

export default function TodoPrior({ prior }) {
  return <div className={style.prior} data-prior={prior}></div>;
}
