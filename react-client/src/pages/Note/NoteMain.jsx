import { Outlet } from "react-router-dom";
import { NoteContextProvider } from "../../contexts/NoteContext";

const NoteMain = () => {
  return (
    <NoteContextProvider>
      <Outlet />
    </NoteContextProvider>
  );
};

export default NoteMain;
