import style from "./error.module.css";

export default function WrongApproach({ isSignedIn = true }) {
  return (
    <main className={cx(style.main, { [style.account]: !isSignedIn })}>
      <h1 className={style.title}>!</h1>
      <p className={style.description}>잘못된 접근입니다.</p>
    </main>
  );
}
