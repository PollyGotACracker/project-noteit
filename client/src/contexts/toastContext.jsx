import { createContext, useMemo, useState } from "react";
import ToastList from "@components/toastList";
import { v4 as uuid } from "uuid";

export const ToastsStateContext = createContext([]);
export const ToastsDispatchContext = createContext({});

const ToastsProvider = ({ children }) => {
  const [showedToasts, setShowedToasts] = useState([]);

  const show = (Component, text) => {
    const id = uuid().substring(0, 8);
    setShowedToasts((prevToasts) => {
      return [...prevToasts, { Component, id, text, isShowed: true }];
    });
  };

  const close = (id) => {
    setShowedToasts((prevToasts) => {
      return prevToasts.filter((item) => item.id !== id);
    });
  };

  const dispatch = useMemo(() => ({
    show,
    close,
  }));

  return (
    <ToastsStateContext.Provider value={showedToasts}>
      <ToastsDispatchContext.Provider value={dispatch}>
        <ToastList />
        {children}
      </ToastsDispatchContext.Provider>
    </ToastsStateContext.Provider>
  );
};

export default ToastsProvider;
