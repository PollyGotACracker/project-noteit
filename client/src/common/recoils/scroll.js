import { atomFamily } from "recoil";

export const scrollPosState = atomFamily({
  key: "scrollPosState",
  default: (path) => {
    return { path, pos: 0 };
  },
});
