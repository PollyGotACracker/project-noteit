import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "react-query";
import useUserFetcher from "@services/useUserFetcher";
import checkValidation from "@utils/checkValidation";
import userMsg from "@data/userMsg";
import { URLS } from "@/router";
import useToasts from "@hooks/useToasts";

const PwdResetLinkPage = () => {
  const { showToast } = useToasts();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { resetPassword } = useUserFetcher();
  const { mutate: mutateResetPassword } = useMutation(
    resetPassword({
      queries: {
        onSuccess: (data) => {
          showToast(data.message);
          navigate(URLS.SIGN_IN, {
            state: { email: data.email },
            replace: true,
          });
        },
      },
    })
  );

  const submitForm = (e) => {
    e.preventDefault();

    const { password, repassword } = e.target;
    if (password.value !== repassword.value) {
      showToast(userMsg.WRONG_REPASSWORD);
      repassword.focus();
      return;
    }

    try {
      checkValidation(e.target);
      mutateResetPassword({
        token: searchParams.get("verify"),
        value: e.target.password.value,
      });
    } catch (err) {
      showToast(err.message);
    }
  };

  if (!searchParams.get("verify")) return <></>;
  return (
    <main className="out PwdReset">
      <section className="container">
        <p>새로운 비밀번호를 입력해주세요.</p>
        <form className="form-column" onSubmit={submitForm}>
          <label htmlFor="password">
            <input
              id="password"
              name="password"
              type="password"
              defaultValue=""
              placeholder="새 비밀번호"
              autoComplete="off"
              spellCheck="false"
            />
          </label>
          <label htmlFor="repassword">
            <input
              id="repassword"
              name="repassword"
              type="password"
              defaultValue=""
              placeholder="새 비밀번호 확인"
              autoComplete="off"
              spellCheck="false"
            />
          </label>
          <button className="submit" type="submit">
            비밀번호 변경
          </button>
        </form>
      </section>
    </main>
  );
};

export default PwdResetLinkPage;
