const genColor = ({ count, alpha }) => {
  let i = 0;
  const bgList = [];
  // hue 의 최대값은 360
  // 색상 중복을 피하기 위하여 hue 의 gap 지정:
  // 360 을 label 전체 개수로 나눈 값
  const gap = parseInt(360 / count);
  let hue = 0;
  while (i < count) {
    bgList.push(`hsla(${hue}, 50%, 50%, ${alpha})`);
    hue += gap;
    i++;
  }
  return bgList;
};

export default genColor;
