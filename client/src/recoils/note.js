import { atom } from "recoil";
import { v4 as uuid } from "uuid";

export const initCat = () => ({
  c_userid: "",
  c_catid: "",
  c_category: "",
  c_date: "",
});

export const initSub = (subId) => ({
  s_subid: "",
  s_subject: "",
  s_catid: "",
  s_category: "",
  s_date: "",
  // for editor issue when refresh page(UPDATE:undefined)
  s_content: subId ? undefined : "",
});

export const initKey = () => ({
  // for keywordlist in write page
  k_keyid: uuid().substring(0, 8),
  k_subid: "",
  k_index: 0,
  k_keyword: "",
  k_desc: "",
});

export const cat = atom({
  key: "catState",
  default: initCat(),
});
