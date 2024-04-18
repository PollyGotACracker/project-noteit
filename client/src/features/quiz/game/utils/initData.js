import moment from "moment";
import { v4 as uuid } from "uuid";

export const initScore = () => ({
  sc_scoid: uuid().substring(0, 8),
  sc_userid: "",
  sc_date: moment().format("YYYY[-]MM[-]DD"),
  sc_time: moment().format("HH:mm:ss"),
  sc_duration: "",
  sc_catid: "",
  sc_category: "",
  sc_score: 0,
  sc_totalscore: 0,
});
