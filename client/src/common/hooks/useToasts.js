import { useContext } from "react";
import { ToastsDispatchContext } from "@contexts/ToastContext";
import Toast from "@components/toast/Toast";

const useToasts = () => {
  const { show, close } = useContext(ToastsDispatchContext);

  const showToast = (text) => {
    show(Toast, text);
  };

  const closeToast = (id) => {
    close(id);
  };

  return { showToast, closeToast };
};

export default useToasts;
