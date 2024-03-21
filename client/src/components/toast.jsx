import "@styles/components/toast.css";
import { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

const Toast = ({ isShowed, onClose, text }) => {
  useEffect(() => {
    setTimeout(onClose, 8000);
  }, []);

  if (isShowed) {
    return (
      <>
        <p>{text}</p>
        <button className="close-btn" onClick={onClose}>
          <RxCross2 />
        </button>
      </>
    );
  }
};

export default Toast;
