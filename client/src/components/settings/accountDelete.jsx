import { useRef } from "react";
import { useMutation } from "react-query";
import { FaUserTimes } from "react-icons/fa";
import useUserFetcher from "@services/useUserFetcher";
import checkValidation from "@utils/checkValidation";
import useUserSignOut from "@hooks/useUserSignout";
import SettingBox from "@components/settings/wrapper";

const AccountDelete = () => {
  const { deleteAccount } = useUserFetcher();
  const { initAuth } = useUserSignOut({ accountDeleted: true });
  const inputRef = useRef(null);
  const { mutate } = useMutation(
    deleteAccount({
      queries: {
        onSuccess: (data) => {
          alert(data.message);
          initAuth();
        },
        onError: () => {
          inputRef.current.value = "";
        },
      },
    })
  );

  const submitHandler = (e) => {
    e.preventDefault();
    const isValid = checkValidation(e.target);
    if (!isValid) return;
    if (
      window.confirm(
        "계정을 삭제하면 데이터를 복구할 수 없습니다.\n계속할까요?"
      )
    ) {
      const password = e.target.password.value;
      mutate({ password });
    } else {
      inputRef.current.value = "";
    }
  };

  return (
    <SettingBox
      icon={<FaUserTimes />}
      title={"계정 삭제"}
      className={"account-delete"}
    >
      <form onSubmit={submitHandler}>
        <label htmlFor="deletePassword">
          <input
            ref={inputRef}
            id="deletePassword"
            name="password"
            type="password"
            autoComplete="false"
            placeholder="비밀번호 입력"
            onPaste={(e) => e.preventDefault()}
          />
        </label>
        <button className="submit" type="submit">
          계정 삭제
        </button>
      </form>
    </SettingBox>
  );
};

export default AccountDelete;
