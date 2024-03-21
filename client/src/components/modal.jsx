import "@styles/components/modal.css";
import { RxCross2 } from "react-icons/rx";

const Modal = ({ isOpen, onClose, ...props }) => {
  const Children = () => {
    const Content = props?.content;
    if (!Content) return <></>;
    if (typeof Content === "string") {
      return <p>{Content}</p>;
    } else return <Content />;
  };

  const cancelClickHandler = async () => {
    if (props.cancelClick) await props.cancelClick();
    onClose();
  };

  const okClickHandler = async () => {
    if (props.okClick) await props.okClick();
    onClose();
  };

  if (isOpen) {
    return (
      <>
        <Children />
        <button className="close-btn" onClick={onClose}>
          <RxCross2 />
        </button>
        {props?.okClick ? (
          <div className="confirm-wrapper">
            <button className="cancel-btn" onClick={cancelClickHandler}>
              취소
            </button>
            <button className="ok-btn" onClick={okClickHandler}>
              확인
            </button>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
};

export default Modal;
