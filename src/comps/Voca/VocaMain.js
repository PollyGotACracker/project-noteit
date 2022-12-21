import VocaNote from "./VocaNote";
import { VocaContextProvider } from "../../context/VocaContext";

const VocaCategory = () => {
  return (
    <VocaContextProvider>
      <VocaNote />
    </VocaContextProvider>
  );
};

export default VocaCategory;
