import { motion, AnimatePresence } from "framer-motion";
import Item from "@components/todo/item";

const TodoItemWrapper = ({ data }) => {
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
    <motion.ul className="list overflow-list" {...containerMotionProps}>
      <AnimatePresence mode="sync">
        {data?.map((todo) => (
          <motion.li key={todo.t_todoid} {...itemMotionProps}>
            <Item item={todo} />
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
};

export default TodoItemWrapper;
