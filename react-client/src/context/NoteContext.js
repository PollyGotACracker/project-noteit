import { useContext, createContext, useState } from "react";
import { initCat, initSub, initKey } from "../data/NoteData";

const NoteContext = createContext();

const useNoteContext = () => {
  return useContext(NoteContext);
};

const NoteContextProvider = ({ children }) => {
  const [noteCatList, setNoteCatList] = useState([]);
  const [catVal, setCatVal] = useState({});
  const [noteSubList, setNoteSubList] = useState([]);
  const [noteCat, setNoteCat] = useState(initCat);
  const [noteSub, setNoteSub] = useState(initSub);
  const [noteKey, setNoteKey] = useState(initKey);

  const props = {
    noteCatList,
    setNoteCatList,
    noteSubList,
    setNoteSubList,
    catVal,
    setCatVal,
    noteCat,
    setNoteCat,
    noteSub,
    setNoteSub,
    noteKey,
    setNoteKey,
  };

  return <NoteContext.Provider value={props}>{children}</NoteContext.Provider>;
};

export { useNoteContext, NoteContextProvider };
