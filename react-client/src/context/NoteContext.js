import { useContext, createContext, useState } from "react";
import { initCat, initSub, initKey } from "../data/NoteData";

const NoteContext = createContext();

const useNoteContext = () => {
  return useContext(NoteContext);
};

const NoteContextProvider = ({ children }) => {
  const [noteCatList, setNoteCatList] = useState([]);
  const [noteSubList, setNoteSubList] = useState([]);
  const [noteCat, setNoteCat] = useState(initCat);
  const [noteSub, setNoteSub] = useState(initSub);
  const [noteKey, setNoteKey] = useState(initKey);

  const deleteCatHandler = async (catid) => {
    try {
      let res = await fetch(`/note/cat/delete/${catid}`, {
        method: "DELETE",
      });
      res = res.json();
      if (res.error) {
        alert(res.error);
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      alert("서버 연결에 문제가 발생했습니다.");
    }
  };

  const deleteSubHandler = async (subid) => {
    try {
      let res = await fetch(`/note/sub/delete/${subid}`, {
        method: "DELETE",
      });
      res = res.json();
      if (res.error) {
        alert(res.error);
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      alert("서버 연결에 문제가 발생했습니다.");
    }
  };

  const props = {
    noteCatList,
    setNoteCatList,
    noteSubList,
    setNoteSubList,
    noteCat,
    setNoteCat,
    noteSub,
    setNoteSub,
    noteKey,
    setNoteKey,
    deleteCatHandler,
    deleteSubHandler,
  };

  return <NoteContext.Provider value={props}>{children}</NoteContext.Provider>;
};

export { useNoteContext, NoteContextProvider };
