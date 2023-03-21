import { ReactComponent as JoinSvg } from "../assets/images/join.svg";

const Join = () => {
  return (
    <article className="Join">
      <div className="form">
        <input
          id="u_userid"
          name="u_userid"
          type="text"
          placeholder="user@email.com"
          autoComplete="true"
        />
        <input
          id="u_pwd"
          name="u_pwd"
          type="password"
          placeholder="비밀번호"
          autoComplete="false"
        />
        <input
          id="u_repwd"
          name="u_repwd"
          type="password"
          placeholder="비밀번호 확인"
          autoComplete="false"
        />
        <button type="button">가입</button>
        <button type="button">Google</button>
      </div>
      <JoinSvg
        className="join-img"
        fill={getComputedStyle(document.documentElement).getPropertyValue(
          "--accentalpha"
        )}
      />
    </article>
  );
};

export default Join;
