import { atom, selector } from "recoil";

export const sidebarState = atom({
  key: "sidebarState",
  default: false,
});

export const overlayState = atom({
  key: "overlayState",
  default: false,
});

export const toggleSidebarSelector = selector({
  key: "toggleSidebarSelector",
  get: ({ get }) => get(sidebarState),
  set: ({ get, set }) => {
    const state = get(sidebarState);
    set(sidebarState, !state);
    set(overlayState, !state);
  },
});

export const closeSidebarSelector = selector({
  key: "closeSidebarSelector",
  get: ({ get }) => get(sidebarState),
  set: ({ set }) => {
    set(sidebarState, false);
    set(overlayState, false);
  },
});
