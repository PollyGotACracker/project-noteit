import { atom } from "recoil";
import { initCat } from "../utils/initData";

export const catState = atom({
  key: "catState",
  default: initCat(),
});
