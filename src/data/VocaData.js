import uuid from "react-uuid";
const vocaItem = {
  id: uuid(),
  category: "조류",
  subject: "앵무새",
  keyword: ["모란앵무", "왕관앵무", "코뉴어", "유리앵무", "빗창앵무"],
  memo: ["모두 작은 앵무새입니다."],
};
// vocaItem 객체가 담기는 배열
const vocaArr = [
  vocaItem,
  vocaItem,
  vocaItem,
  vocaItem,
  vocaItem,
  vocaItem,
  vocaItem,
  vocaItem,
  vocaItem,
  vocaItem,
  vocaItem,
  vocaItem,
  vocaItem,
  vocaItem,
  vocaItem,
  vocaItem,
  vocaItem,
  vocaItem,
  vocaItem,
  vocaItem,
  vocaItem,
];

export { vocaArr, vocaItem };
