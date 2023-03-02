import { useContext, createContext } from "react";

const UserContext = createContext();

const useUserContext = () => {
  return useContext(UserContext);
};

const UserContextProvider = ({ children }) => {
  const tempUser = "polly@gmail.com";
  const props = {
    tempUser,
  };
  return <UserContext.Provider value={props}>{children}</UserContext.Provider>;
};

export { useUserContext, UserContextProvider };
