import { atom } from "recoil";
import { getThemeStorage } from "@utils/manageThemeStorage";

export const themeState = atom({
  key: "themeState",
  default: getThemeStorage(),
});
