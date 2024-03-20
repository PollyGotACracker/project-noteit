import "@styles/components/modal.css";
import { RxCross2 } from "react-icons/rx";

const Modal = ({ isOpen, onClose, ...props }) => {
  const Content = props?.content;

  if (isOpen) {
    return (
      <>
        {typeof props?.content === "string" ? <p>{Content}</p> : <Content />}
        <button className="close-btn" onClick={onClose}>
          <RxCross2 />
        </button>
      </>
    );
  }
};

export default Modal;
