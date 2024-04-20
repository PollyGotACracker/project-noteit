import { atom } from "recoil";

export const subIndexState = atom({
  key: "subIndexState",
  default: 0,
});

export const keyIndexState = atom({
  key: "keyIndexState",
  default: 0,
});
