import { useContext, createContext, useState, useCallback } from "react";
import uuid from "react-uuid";
import moment from "moment";
const VocaContext = createContext();

const useVocaContext = () => {
  return useContext(VocaContext);
};

const VocaContextProvider = ({ children }) => {
  const InitCat = () => {
    const catData = {
      // 임시 c_userid
      c_userid: "polly",
      c_catid: uuid().substring(0, 8),
      c_category: "",
    };
    return catData;
  };

  const InitSub = () => {
    const subData = {
      s_subid: uuid().substring(0, 8),
      s_subject: "",
      s_catid: uuid().substring(0, 8),
      s_category: "",
      s_date: moment().format("YYYY[-]MM[-]DD"),
      s_time: moment().format("HH:mm:ss"),
      s_content: "",
    };
    return subData;
  };

  const InitKey = () => {
    const keyData = {
      k_keyid: "",
      k_subid: "",
      k_keyword: "",
      k_desc: "",
    };
    return keyData;
  };

  const InitAtt = () => {
    const attData = {
      a_attid: uuid().substring(0, 8),
      a_subid: "",
      a_date: moment().format("YYYY[-]MM[-]DD"),
      a_time: moment().format("HH:mm:ss"),
      a_originalname: "",
      a_savename: "",
      a_ext: "",
    };
    return attData;
  };

  const [vocaCatList, setVocaCatList] = useState([]);
  const [vocaSubList, setVocaSubList] = useState([]);
  // const [vocaInputList, setVocaInputList] = useState([]);
  const [vocaCat, setVocaCat] = useState(InitCat);
  const [vocaSub, setVocaSub] = useState(InitSub);
  const [vocaKey, setVocaKey] = useState(InitKey);

  const clickWriteHandler = (e) => {
    const target = e.target;
    const catid = target?.dataset?.catid;
    const subid = target?.dataset?.subid;
    if (!subid) {
      window.location.pathname = `/voca/write/${catid}`;
    } else {
      window.location.pathname = `/voca/write/${catid}/${subid}`;
    }
  };

  const deleteCatHandler = useCallback(async (catid) => {
    try {
      let res = await fetch(`/voca/cat/delete/${catid}`, {
        method: "DELETE",
      });
      res = res.json();
      if (res.error) {
        alert(res.error);
      } else {
        window.location.replace(`/voca`);
      }
    } catch (error) {
      console.log(error);
      alert("서버 연결에 문제가 발생했습니다.");
    }
  }, []);

  const deleteSubHandler = useCallback(async (subid, catid) => {
    try {
      let res = await fetch(`/voca/sub/delete/${subid}`, {
        method: "DELETE",
      });
      res = res.json();
      if (res.error) {
        alert(res.error);
      } else {
        window.location.replace(`/voca/category/${catid}`);
      }
    } catch (error) {
      console.log(error);
      alert("서버 연결에 문제가 발생했습니다.");
    }
  }, []);

  const props = {
    vocaCatList,
    setVocaCatList,
    vocaSubList,
    setVocaSubList,
    // vocaInputList,
    // setVocaInputList,
    vocaCat,
    InitCat,
    setVocaCat,
    vocaSub,
    InitSub,
    setVocaSub,
    vocaKey,
    InitKey,
    setVocaKey,
    clickWriteHandler,
    deleteCatHandler,
    deleteSubHandler,
  };

  return <VocaContext.Provider value={props}>{children}</VocaContext.Provider>;
};

export { useVocaContext, VocaContextProvider };
