import { useContext } from "react";
import ReactDom from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ToastsDispatchContext,
  ToastsStateContext,
} from "@contexts/toastContext";

const ToastList = () => {
  const showedToasts = useContext(ToastsStateContext);
  const { close } = useContext(ToastsDispatchContext);

  const motionProps = (index) => ({
    initial: "hidden",
    animate: "visible",
    exit: "hidden",
    transition: { duration: 0.3 },
    variants: {
      hidden: {
        transform: `translate(-50%, calc(-30% - ${50 * index + 10}px))`,
        opacity: 0,
      },
      visible: {
        transform: `translate(-50%, calc(-30% - ${50 * index + 10}px))`,
        zIndex: 500,
        opacity: 1,
      },
    },
  });

  return ReactDom.createPortal(
    <div className="toasts">
      <AnimatePresence>
        {showedToasts.map((toastInfo, index) => {
          const { Component, id, text, isShowed } = toastInfo;
          const onClose = () => {
            close(id);
          };

          return (
            <motion.div key={index} className="toast" {...motionProps(index)}>
              <Component isShowed={isShowed} onClose={onClose} text={text} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>,
    document.body
  );
};

export default ToastList;
