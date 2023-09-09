/**
 * cf)
 * 사용자 선호 테마
 * window.matchMedia("(prefers-color-scheme: dark)").matches => boolean
 */

export const getThemeStorage = () => {
  const userColorTheme = localStorage?.getItem("color-theme");
  const osColorTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  const value = userColorTheme || osColorTheme;
  const theme = value === "dark" ? true : false;

  return theme;
};

export const setThemeStorage = (value) => {
  const theme = value ? "dark" : "light";
  localStorage.setItem("color-theme", theme);
  document.documentElement.setAttribute("color-theme", theme);
};
