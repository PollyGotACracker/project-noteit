import "@styles/components/modal.css";
import { useRecoilState } from "recoil";
import { AnimatePresence, motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { modalSelector } from "@recoils/global";

const Modal = ({ content }) => {
  const [modalActive, toggleModal] = useRecoilState(modalSelector);

  const variants = {
    hidden: {
      transform: "translate(-50%, -53%)",
      opacity: 0,
    },
    visible: {
      transform: "translate(-50%, -50%)",
      zIndex: 200,
      opacity: 1,
    },
  };

  return (
    <AnimatePresence>
      {modalActive && (
        <motion.div
          className="modal"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={variants}
        >
          {content}
          <button className="btn-close" onClick={toggleModal}>
            <RxCross2 />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
