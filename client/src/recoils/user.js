import { atom } from "recoil";

export const initUser = () => ({
  u_userid: "",
  u_nickname: "",
  u_profileimg: "",
  u_profilestr: "",
  u_score: "",
});

export const userState = atom({
  key: "userState",
  default: initUser,
});

export const queryEnabledState = atom({
  key: "queryEnabledState",
  default: false,
});

export const isSignedInState = atom({
  key: "isSignedInState",
  default: false,
});
