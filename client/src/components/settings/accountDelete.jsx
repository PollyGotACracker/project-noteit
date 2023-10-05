import { FaUserTimes } from "react-icons/fa";
import SettingBox from "@components/settings/wrapper";

const AccountDelete = () => {
  return (
    <SettingBox icon={<FaUserTimes />} title={"계정 삭제"}>
      <div className="account-box">
        <form>
          <input
            type="password"
            autoComplete="false"
            placeholder="비밀번호 입력"
            onPaste={(e) => e.preventDefault()}
          />
          <button type="submit">삭제</button>
        </form>
      </div>
    </SettingBox>
  );
};

export default AccountDelete;
