import { useVocaContext } from "../../context/VocaContext";

const VocaInput = () => {
  const { vocaInputList } = useVocaContext();

  const inputListView = vocaInputList.map(() => {
    return <input className="keyword" type="text" name="keyword" />;
  });

  return <div id="keyword-box">{inputListView}</div>;
};
export default VocaInput;
