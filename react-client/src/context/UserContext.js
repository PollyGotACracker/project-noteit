import { useState, useContext, createContext } from "react";

const UserContext = createContext();

const useUserContext = () => {
  return useContext(UserContext);
};

const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    u_userid: "",
    u_nickname: "",
    u_profileimg: "",
    u_profilestr: "",
    u_totalscore: "",
  });
  // context provider 값이 rendering 전에 state 변수에 setting 되지 않음
  const [profileData, setProfileData] = useState({
    src: "",
    name: "",
    str: "",
  });
  const [colorTheme, setColorTheme] = useState(false);

  const props = {
    userData,
    setUserData,
    profileData,
    setProfileData,
    colorTheme,
    setColorTheme,
  };
  return <UserContext.Provider value={props}>{children}</UserContext.Provider>;
};

export { useUserContext, UserContextProvider };
