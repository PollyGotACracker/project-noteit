import { motion, AnimatePresence } from "framer-motion";
import Item from "@components/todo/item";

const TodoItemWrapper = ({ data }) => {
  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  const item = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  };

  const todoContent = data?.map((todo) => {
    return (
      <motion.li
        variants={item}
        layout
        key={todo.t_todoid}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          opacity: { ease: "linear" },
          layout: { duration: 0.3 },
        }}
      >
        <Item item={todo} />
      </motion.li>
    );
  });

  return (
    <motion.ul
      className="list"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence mode="sync">{todoContent}</AnimatePresence>
    </motion.ul>
  );
};

export default TodoItemWrapper;
