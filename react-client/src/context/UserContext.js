import { useState, useContext, createContext } from "react";

const UserContext = createContext();

const useUserContext = () => {
  return useContext(UserContext);
};

const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    userid: "",
    nickname: "",
    profileimg: "",
    profilestr: "",
    cscore: "",
  });

  const props = {
    userData,
    setUserData,
  };
  return <UserContext.Provider value={props}>{children}</UserContext.Provider>;
};

export { useUserContext, UserContextProvider };
