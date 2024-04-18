import style from "../styles/form.module.css";
import { useRef } from "react";
import { useMutation } from "react-query";
import { RiLockPasswordFill } from "react-icons/ri";
import accountMessage from "@constants/accountMessage";
import usePwdChangeFetcher from "../services/usePwdChangeFetcher";
import checkValidation from "@utils/checkValidation";
import SettingBox from "./SettingBox";
import useToasts from "@hooks/useToasts";
import cx from "classnames";

export default function PasswordChange() {
  const { showToast } = useToasts();
  const { changePassword } = usePwdChangeFetcher();
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

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      checkValidation(e.target);
      const { password, newPassword, reNewPassword } = e.target;
      if (newPassword.value !== reNewPassword.value) {
        showToast(accountMessage.WRONG_RENEWPASSWORD);
        reNewPassword.focus();
        return;
      } else {
        mutate({ password: password.value, value: newPassword.value });
      }
    } catch (err) {
      showToast(err.message);
    }
  };

  const inputListData = [
    {
      eng: "password",
      kor: "비밀번호",
      ref: pwdRef,
    },
    {
      eng: "newPassword",
      kor: "새 비밀번호",
      ref: newPwdRef,
    },
    {
      eng: "reNewPassword",
      kor: "새 비밀번호 확인",
      ref: reNewPwdRef,
    },
  ];

  return (
    <SettingBox
      icon={<RiLockPasswordFill />}
      title={"비밀번호 변경"}
      isColumn={true}
    >
      <form className={cx(style.form, style.right)} onSubmit={onSubmit}>
        {inputListData.map((input) => (
          <label htmlFor={input.eng} key={input.eng}>
            <span>{input.kor}</span>
            <input
              id={input.eng}
              name={input.eng}
              type="password"
              autoComplete="false"
              placeholder={input.kor}
              minLength={8}
              ref={input.ref}
              onPaste={(e) => e.preventDefault()}
            />
          </label>
        ))}
        <button className="submit" type="submit">
          변경
        </button>
      </form>
    </SettingBox>
  );
}
