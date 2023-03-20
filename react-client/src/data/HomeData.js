import moment from "moment";

export const getToday = () => {
  const today = {
    date: moment().format("YYYY[/]MM[/]DD[ ]ddd"),
    time: moment().format("LTS"),
  };
  return today;
};

export const speakListData = [
  "만나서 정말 반가워!",
  "힘들면 30분만 쉬는 거야~",
  "오늘도 화이팅이야!!",
  "1초에 1개씩 까먹는 것 같아!!",
  "조금씩 꾸준히 공부하는거야~",
  "천재 앵무새는 모든 것을 알아요~",
];

export const genColor = ({ count, alpha }) => {
  let i = 0;
  const bg = [];
  // hue 의 최대값은 360
  // 색상 중복을 피하기 위하여 hue 의 gap 지정:
  // 360 을 label 전체 개수로 나눈 값
  const gap = parseInt(360 / count);
  let hue = 0;
  while (i < count) {
    bg.push(`hsla(${hue}, 50%, 50%, ${alpha})`);
    hue += gap;
    i++;
  }
  return { bg };
};
