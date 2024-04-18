import moment from "moment";

export const getDate = () => moment().format("YYYY[-]MM[-]DD");
export const getTime = () => moment().format("HH:mm:ss");
