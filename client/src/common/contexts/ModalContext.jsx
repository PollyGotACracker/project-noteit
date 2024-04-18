import { createContext, useMemo, useState } from "react";
import ModalList from "@components/modal/ModalList";

export const ModalsStateContext = createContext([]);
export const ModalsDispatchContext = createContext({});

const ModalsProvider = ({ children }) => {
  const [openedModals, setOpenedModals] = useState([]);

  const open = (Component, props) => {
    setOpenedModals((prevModals) => {
      return [...prevModals, { Component, props, isOpen: true }];
    });
  };

  const close = (Component) => {
    setOpenedModals((prevModals) => {
      return prevModals.filter((item) => item.Component !== Component);
    });
  };

  const dispatch = useMemo(() => ({
    open,
    close,
  }));

  return (
    <ModalsStateContext.Provider value={openedModals}>
      <ModalsDispatchContext.Provider value={dispatch}>
        <ModalList />
        {children}
      </ModalsDispatchContext.Provider>
    </ModalsStateContext.Provider>
  );
};

export default ModalsProvider;
