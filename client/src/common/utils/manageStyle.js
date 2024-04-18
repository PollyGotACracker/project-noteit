export const getStyle = (prop) =>
  getComputedStyle(document.documentElement).getPropertyValue(prop);

export const setStyle = (prop, value) =>
  document.documentElement.style.setProperty(prop, value);
