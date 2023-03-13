import moment from "moment";
import uuid from "react-uuid";

export const initCat = () => {
  const catData = {
    // temp
    c_userid: "polly@gmail.com",
    c_catid: uuid().substring(0, 8),
    c_category: "",
    c_date: moment().format("YYYY[-]MM[-]DD"),
  };
  return catData;
};

export const initSub = () => {
  const subData = {
    s_subid: uuid().substring(0, 8),
    s_subject: "",
    s_catid: uuid().substring(0, 8),
    s_category: "",
    s_date: moment().format("YYYY[-]MM[-]DD"),
    s_content: "",
  };
  return subData;
};

export const initKey = () => {
  const keyData = {
    k_keyid: uuid().substring(0, 8),
    k_subid: "",
    k_index: 0,
    k_keyword: "",
    k_desc: "",
  };
  return keyData;
};

// export const initAtt = () => {
//   const attData = {
//     a_attid: uuid().substring(0, 8),
//     a_subid: "",
//     a_date: moment().format("YYYY[-]MM[-]DD"),
//     a_time: moment().format("HH:mm:ss"),
//     a_originalname: "",
//     a_savename: "",
//     a_ext: "",
//   };
//   return attData;
// };
