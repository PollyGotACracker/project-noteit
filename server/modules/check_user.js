import DB from "../models/index.js";
const USER = DB.models.tbl_users;

export const checkNewUser = async (req, res, next) => {
  const email = req.body.email || req.body.u_userid;
  if (!email) {
    return res.status(400).json({ code: 400, error: "이메일 값이 없습니다." });
  }

  const user = await USER.findByPk(email);
  if (user) {
    return res
      .status(422)
      .json({ code: 422, message: "이미 가입된 이메일입니다." });
  }
  next();
};

export const checkUser = async (req, res, next) => {
  const email = req.body.email || req.body.u_userid;
  if (!email) {
    return res.status(400).json({ code: 400, error: "이메일 값이 없습니다." });
  }
  const user = await USER.findByPk(email);
  if (!user) {
    return res
      .status(422)
      .json({ code: 422, message: "가입되지 않은 이메일입니다." });
  }
  next();
};
