import { useContext } from "react";
import { ModalsDispatchContext } from "@contexts/ModalContext";
import Modal from "@components/modal/Modal";

const useModals = () => {
  const { open, close } = useContext(ModalsDispatchContext);

  const openModal = (props) => {
    open(Modal, props);
  };

  const closeModal = (Component) => {
    close(Component);
  };

  return { openModal, closeModal };
};

export default useModals;
