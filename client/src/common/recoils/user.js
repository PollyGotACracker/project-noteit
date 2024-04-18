import { atom, selector } from "recoil";

export const initUser = () => ({
  u_userid: "",
  u_nickname: "",
  u_profileimg: "",
  u_profilestr: "",
  u_score: "",
});

export const tokenState = atom({
  key: "tokenState",
  default: "",
});

export const tokenSelector = selector({
  key: "tokenSelector",
  get: ({ get }) => get(tokenState),
  set: ({ set, reset }, value) => {
    if (typeof value === "string") set(tokenState, value);
    else reset(tokenState);
  },
});

export const userState = atom({
  key: "userState",
  default: initUser,
});

export const isSignedInState = atom({
  key: "isSignedInState",
  default: false,
});

export const userInfoFlagState = atom({
  key: "userInfoFlagState",
  default: false,
});

export const userTokenFlagState = atom({
  key: "userTokenFlagState",
  default: false,
});
