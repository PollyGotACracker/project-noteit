import uuid from "react-uuid";
const vocaItem = {
  id: 1,
  category: "조류",
  subject: "조그만 앵무새",
  keyword: ["모란앵무", "왕관앵무", "코뉴어", "유리앵무", "빗창앵무"],
  memo: ["모두 작고 똑똑한 앵무새입니다."],
};
const vocaItem2 = {
  id: 2,
  category: "조류",
  subject: "커다란 앵무새",
  keyword: ["유황앵무", "회색앵무", "금강앵무", "아마존앵무"],
  memo: ["모두 커다랗고 똑똑한 앵무새입니다."],
};
// vocaItem 객체가 담기는 배열
const vocaArr = [vocaItem, vocaItem2];

export { vocaArr, vocaItem };
