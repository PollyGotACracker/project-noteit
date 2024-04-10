import style from "@styles/components/modal.module.css";
import { useContext } from "react";
import ReactDom from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ModalsDispatchContext,
  ModalsStateContext,
} from "@contexts/modalContext";
import cx from "classnames";

const ModalList = () => {
  const openedModals = useContext(ModalsStateContext);
  const { close } = useContext(ModalsDispatchContext);

  const motionProps = {
    initial: "hidden",
    animate: "visible",
    exit: "hidden",
    transition: { duration: 0.3 },
    variants: {
      hidden: {
        transform: "translate(-50%, -53%)",
        opacity: 0,
      },
      visible: {
        transform: "translate(-50%, -50%)",
        zIndex: 200,
        opacity: 1,
      },
    },
  };

  return ReactDom.createPortal(
    <div className="modals">
      <AnimatePresence>
        {openedModals.map((modalInfo, index) => {
          const { Component, isOpen, props } = modalInfo;
          const onClose = () => {
            close(Component);
          };

          return (
            <motion.div
              key={index}
              className={cx(style.modal, { [style.large]: props?.isLarge })}
              {...motionProps}
            >
              <Component isOpen={isOpen} onClose={onClose} {...props} />
            </motion.div>
          );
        })}
      </AnimatePresence>
      {!!openedModals.length ? <div className="overlay active" /> : <></>}
    </div>,
    document.body
  );
};

export default ModalList;
