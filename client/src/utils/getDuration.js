import moment from "moment";

const getDuration = ({ date, time }) => {
  const start = moment(`${date} ${time}`, "YYYY-MM-DD HH:mm:ss");
  const end = moment();
  const duration = {
    HH: String(moment.duration(end.diff(start)).hours()).padStart(2, "0"),
    mm: String(moment.duration(end.diff(start)).minutes()).padStart(2, "0"),
    ss: String(moment.duration(end.diff(start)).seconds()).padStart(2, "0"),
  };
  return duration;
};

export default getDuration;
