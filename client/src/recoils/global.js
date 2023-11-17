import { atom, selector } from "recoil";

export const modalState = atom({
  key: "modalState",
  default: "",
});

export const sidebarState = atom({
  key: "sidebarState",
  default: "",
});

export const overlayState = atom({
  key: "overlayState",
  default: "",
});

export const modalSelector = selector({
  key: "modalSelector",
  get: ({ get }) => get(modalState),
  set: ({ get, set }) => {
    const isActive = !!get(modalState);
    if (!isActive) {
      set(modalState, " active");
      set(overlayState, " active");
    }
    if (isActive) {
      set(modalState, "");
      set(overlayState, "");
    }
  },
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
  set: ({ get, set }) => {
    const isModalActive = !!get(modalState);
    if (isModalActive) return;
    set(sidebarState, "");
    set(overlayState, "");
  },
});
