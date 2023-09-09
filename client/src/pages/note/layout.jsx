import { Outlet } from "react-router-dom";
import { NoteContextProvider } from "@contexts/noteContext";

const NotePage = () => {
  return (
    <NoteContextProvider>
      <Outlet />
    </NoteContextProvider>
  );
};

export default NotePage;
