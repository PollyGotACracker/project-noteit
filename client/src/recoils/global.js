import { atom, selector } from "recoil";

export const starsState = atom({
  key: "starsState",
  default: [],
});

export const sidebarState = atom({
  key: "sidebarState",
  default: "",
});

export const overlayState = atom({
  key: "overlayState",
  default: "",
});

export const sidebarSelector = selector({
  key: "sidebarSelector",
  get: ({ get }) => get(sidebarState),
  set: ({ get, set }) => {
    const isActive = !!get(sidebarState);
    if (!isActive) {
      set(sidebarState, " active");
      set(overlayState, " active");
    }
    if (isActive) {
      set(sidebarState, "");
      set(overlayState, "");
    }
  },
});

export const layoutSelector = selector({
  key: "layoutSelector",
  get: ({ get }) => get(overlayState),
  set: ({ set }) => {
    set(sidebarState, "");
    set(overlayState, "");
  },
});
