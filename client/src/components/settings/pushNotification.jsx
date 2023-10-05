import { FaBell } from "react-icons/fa";
import SettingBox from "@components/settings/wrapper";

const PushNotification = () => {
  return (
    <SettingBox icon={<FaBell />} title={"PUSH 알림"}>
      <label htmlFor="push">
        <FaBell />
      </label>
      <input type="checkbox" id="push" value="1" name="push" />
    </SettingBox>
  );
};

export default PushNotification;
