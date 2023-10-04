export const checkSignUpData = (req, res, next) => {
  const { u_userid, u_nickname, u_password } = req.body;
  if (!u_userid) {
    return res.status(400).json({ error: "이메일 데이터가 없습니다." });
  }
  if (!u_nickname) {
    return res.status(400).json({ error: "닉네임 데이터가 없습니다." });
  }
  if (!u_password) {
    return res.status(400).json({ error: "비밀번호 데이터가 없습니다." });
  }
  next();
};
