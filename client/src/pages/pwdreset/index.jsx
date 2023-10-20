import { useState } from "react";
import { useMutation } from "react-query";
import useUserFetcher from "@services/useUserFetcher";

const PwdResetPage = () => {
  const { sendResetLink } = useUserFetcher();
  const [sendLinkLabel, setSendLinkLabel] = useState("링크 전송");
  const { mutate: mutateSendAuthCode } = useMutation(
    sendResetLink({
      queries: {
        onMutate: () => setSendLinkLabel("전송 중..."),
        onSettled: () => setSendLinkLabel("링크 재전송"),
      },
    })
  );

  const submitForm = (e) => {
    e.preventDefault();
    mutateSendAuthCode({ email: e.target.email.value });
  };

  return (
    <main className="PwdReset">
      <form className="form-pwd-reset" onSubmit={submitForm}>
        <label htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            defaultValue=""
            placeholder="이메일"
            autoComplete="on"
            spellCheck="false"
          />
        </label>
        <button type="submit">{sendLinkLabel}</button>
      </form>
    </main>
  );
};

export default PwdResetPage;
