import style from "./loading.module.css";
import { IoIosHourglass } from "react-icons/io";

export default function Loading() {
  return (
    <main className={style.main}>
      <IoIosHourglass />
      <span className={style.message}>점수 계산 중...</span>
    </main>
  );
}
