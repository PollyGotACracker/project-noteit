import style from "@styles/components/modal.module.css";
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
        <button className={style.close} onClick={onClose}>
          <RxCross2 />
        </button>
        {props?.okClick ? (
          <div className={style.confirm_wrapper}>
            <button className={style.cancel} onClick={cancelClickHandler}>
              취소
            </button>
            <button className={style.ok} onClick={okClickHandler}>
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
