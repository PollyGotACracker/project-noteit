import { useContext, createContext, useState } from "react";
import {
  vocaArr as vocaArrData,
  vocaItem as vocaItemData,
} from "../data/VocaData";

const VocaContext = createContext();

const useVocaContext = () => {
  return useContext(VocaContext);
};

const VocaContextProvider = ({ children }) => {
  const [vocaArr, setVocaArr] = useState(vocaArrData);
  const [vocaItem, setVocaItem] = useState(vocaItemData);

  const props = { vocaArr, setVocaArr, vocaItem, setVocaItem };

  return <VocaContext.Provider value={props}>{children}</VocaContext.Provider>;
};

export { useVocaContext, VocaContextProvider };
