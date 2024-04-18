import style from "./item.module.css";
import { Link } from "react-router-dom";
import { FaFileAlt, FaTags } from "react-icons/fa";
import { URLS } from "@/router";

export default function Item({ item }) {
  return (
    <Link
      className={style.item}
      key={item.c_catid}
      to={`${URLS.QUIZ_GAME}/${item.c_catid}`}
    >
      <span>{item.c_category}</span>
      <span>{item.c_quizdate}</span>
      <span>
        <FaFileAlt />
        {item.c_subcount}
      </span>
      <span>
        <FaTags />
        {item.s_keycount}
      </span>
    </Link>
  );
}
