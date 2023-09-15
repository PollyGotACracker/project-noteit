export const getStyle = (prop) =>
  getComputedStyle(document.documentElement).getPropertyValue(prop);

export const setStyle = (prop, value) =>
  document.documentElement.style.setProperty(prop, value);

/**
 * cf)
 * css var 변수 값 가져오기
 * getComputedStyle(document.documentElement)
 *  .getPropertyValue('--variable-name');
 *
 * css var 변수 값 세팅하기
 * document.documentElement.style
 *  .setProperty('--variable-name', 'black');
 */
