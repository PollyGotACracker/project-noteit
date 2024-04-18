import style from "./list.module.css";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import { motion, AnimatePresence } from "framer-motion";
import { userState } from "@recoils/user";
import { todosState } from "../recoils/todo";
import useTodoFetcher from "../services/useTodoFetcher";
import Item from "./Item";
import cx from "classnames";

export default function List() {
  const { getTodos } = useTodoFetcher();
  const userData = useRecoilValue(userState);
  const [todoList, setTodoList] = useRecoilState(todosState);
  const { data } = useQuery(getTodos({ userId: userData.u_userid }));

  useEffect(() => {
    if (data) setTodoList([...data]);
  }, [data]);

  const containerMotionProps = {
    initial: "hidden",
    animate: "visible",
    variants: {
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2,
        },
      },
    },
  };

  const itemMotionProps = {
    layout: true,
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
      opacity: { ease: "linear" },
      layout: { duration: 0.3 },
    },
    variants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
      },
    },
  };

  return (
    <motion.ul
      className={cx(style.list, style.overflow)}
      {...containerMotionProps}
    >
      <AnimatePresence mode="sync">
        {todoList?.map((todo) => (
          <motion.li key={todo.t_todoid} {...itemMotionProps}>
            <Item item={todo} />
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}
