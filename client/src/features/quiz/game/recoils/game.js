import { atom, selector } from "recoil";

export const subListState = atom({
  key: "subListState",
  default: [],
});

export const keyListState = atom({
  key: "keyListState",
  default: [],
});

export const keyListSelector = selector({
  key: "keyListSelector",
  get: ({ get }) => get(keyListState),
  set: ({ get, set }) => {
    const subList = get(subListState);
    const subIndex = get(subIdxState);
    set(keyListState, [...subList[subIndex].tbl_keywords]);
  },
});

export const subIdxState = atom({
  key: "subIdxState",
  default: 0,
});

export const subIdxSelector = selector({
  key: "subIdxSelector",
  get: ({ get }) => get(subIdxState),
  set: ({ get, set }) => {
    const value = get(subIdxState);
    set(subIdxState, value + 1);
  },
});

export const keyIdxState = atom({
  key: "keyIdxState",
  default: 0,
});

export const keyIdxSelector = selector({
  key: "keyIdxSelector",
  get: ({ get }) => get(keyIdxState),
  set: ({ get, set }) => {
    const value = get(keyIdxState);
    set(keyIdxState, value + 1);
  },
});
