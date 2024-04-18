import style from "@styles/account.module.css";
import { useState } from "react";
import { useMutation } from "react-query";
import usePwdResetFetcher from "../services/usePwdResetFetcher";

const PwdResetPage = () => {
  const { sendResetLink } = usePwdResetFetcher();
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
    <main className={style.account}>
      <section className={style.container}>
        <form className={style.column} onSubmit={submitForm}>
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
          <button className={style.submit} type="submit">
            {sendLinkLabel}
          </button>
        </form>
      </section>
    </main>
  );
};

export default PwdResetPage;
