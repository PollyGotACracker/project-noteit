import { useState } from "react";
import { useMutation } from "react-query";
import useUserFetcher from "@services/useUserFetcher";

const PwdResetPage = () => {
  const { sendResetLink } = useUserFetcher();
  const [sendLinkLabel, setSendLinkLabel] = useState("초기화 링크 전송");
  const { mutate: mutateSendAuthCode } = useMutation(
    sendResetLink({
      queries: {
        onMutate: () => setSendLinkLabel("전송 중..."),
        onSuccess: () => setSendLinkLabel("초기화 링크 재전송"),
        onError: () => setSendLinkLabel("초기화 링크 전송"),
      },
    })
  );

  const submitForm = (e) => {
    e.preventDefault();
    mutateSendAuthCode({ email: e.target.email.value });
  };

  return (
    <main className="PwdReset">
      <section className="container">
        <form className="form-column" onSubmit={submitForm}>
          <p>가입된 이메일을 입력해주세요.</p>
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
          <button className="submit" type="submit">
            {sendLinkLabel}
          </button>
        </form>
      </section>
    </main>
  );
};

export default PwdResetPage;
