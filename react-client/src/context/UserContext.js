import { useState, useContext, createContext } from "react";

const UserContext = createContext();

const useUserContext = () => {
  return useContext(UserContext);
};

const UserContextProvider = ({ children }) => {
  const userID = "polly@gmail.com";
  const nickname = "polly";
  const profileImg = "polly@gmail.com";
  const profileStr = "너무 졸리다";
  const [cscore, setCscore] = useState(0);

  const props = {
    userID,
    nickname,
    profileImg,
    profileStr,
    cscore,
  };
  return <UserContext.Provider value={props}>{children}</UserContext.Provider>;
};

export { useUserContext, UserContextProvider };
