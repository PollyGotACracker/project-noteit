import { useRef } from "react";
import { useMutation } from "react-query";
import { RiLockPasswordFill } from "react-icons/ri";
import userMsg from "@data/userMsg";
import useUserFetcher from "@services/useUserFetcher";
import checkValidation from "@utils/checkValidation";
import SettingBox from "@components/settings/wrapper";
import useToasts from "@hooks/useToasts";

const PasswordChange = () => {
  const { showToast } = useToasts();
  const { changePassword } = useUserFetcher();
  const pwdRef = useRef(null);
  const newPwdRef = useRef(null);
  const reNewPwdRef = useRef(null);
  const { mutate } = useMutation(
    changePassword({
      queries: {
        onSuccess: (data) => {
          showToast(data.message);
          pwdRef.current.value = "";
          newPwdRef.current.value = "";
          reNewPwdRef.current.value = "";
        },
      },
    })
  );

  const submitHandler = (e) => {
    e.preventDefault();
    try {
      checkValidation(e.target);
      const { password, newPassword, reNewPassword } = e.target;
      if (newPassword.value !== reNewPassword.value) {
        showToast(userMsg.WRONG_RENEWPASSWORD);
        reNewPassword.focus();
        return;
      } else {
        mutate({ password: password.value, value: newPassword.value });
      }
    } catch (err) {
      showToast(err.message);
    }
  };

  return (
    <SettingBox
      icon={<RiLockPasswordFill />}
      title={"비밀번호 변경"}
      className={"password-change"}
    >
      <form onSubmit={submitHandler}>
        <label htmlFor="password">
          <span>비밀번호</span>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="false"
            placeholder="비밀번호"
            minLength={8}
            ref={pwdRef}
            onPaste={(e) => e.preventDefault()}
          />
        </label>
        <label htmlFor="newPassword">
          <span>새 비밀번호</span>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            autoComplete="false"
            placeholder="새 비밀번호"
            minLength={8}
            ref={newPwdRef}
          />
        </label>
        <label htmlFor="reNewPassword">
          <span> 새 비밀번호 확인</span>
          <input
            id="reNewPassword"
            name="reNewPassword"
            type="password"
            autoComplete="false"
            placeholder="새 비밀번호 확인"
            minLength={8}
            ref={reNewPwdRef}
          />
        </label>
        <button className="submit" type="submit">
          변경
        </button>
      </form>
    </SettingBox>
  );
};

export default PasswordChange;
