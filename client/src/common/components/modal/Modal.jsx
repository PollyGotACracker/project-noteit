import style from "./modal.module.css";
import { RxCross2 } from "react-icons/rx";

export default function Modal({ isOpen, onClose, ...props }) {
  const Children = () => {
    const Content = props?.content;
    if (!Content) return <></>;
    if (typeof Content === "string") {
      return <p className={style.message}>{Content}</p>;
    } else return <Content />;
  };

  const handleCancel = async () => {
    if (props.cancelClick) await props.cancelClick();
    onClose();
  };

  const handleOk = async () => {
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
            <button className={style.cancel} onClick={handleCancel}>
              취소
            </button>
            <button className={style.ok} onClick={handleOk}>
              확인
            </button>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
}
