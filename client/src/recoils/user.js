import { atom } from "recoil";

const initUser = {
  u_userid: "",
  u_nickname: "",
  u_profileimg: "",
  u_profilestr: "",
  u_score: "",
};

const initProfile = {
  src: "",
  name: "",
  str: "",
};

export const userState = atom({
  key: "userState",
  default: initUser,
});

export const profileState = atom({
  key: "profileState",
  default: initProfile,
});
