const Login = () => {
  return (
    <article className="Login">
      <form className="login">
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
          placeholder="password"
          autoComplete="false"
        />
      </form>
    </article>
  );
};

export default Login;
