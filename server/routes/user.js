import express from "express";
import { Sequelize } from "sequelize";
import fileUp from "../modules/file_upload.js";
import { checkPassword, hashPassword } from "../modules/password_hash.js";
import { getToken, verifyToken } from "../modules/user_token.js";
import { checkSignUpData } from "../modules/auth_validation.js";
import DB from "../models/index.js";

const USER = DB.models.tbl_users;
const router = express.Router();

router.post("/signup", checkSignUpData, async (req, res, next) => {
  try {
    const data = req.body;
    const hashedPassword = await hashPassword(data.u_password);
    if (hashedPassword) {
      const newData = { ...data, u_password: hashedPassword };
      await USER.create(newData);
    }
    return res.json({ message: "가입을 환영합니다!" });
  } catch (err) {
    if (err instanceof Sequelize.UniqueConstraintError) {
      err.errors.forEach((errorItem) => {
        if (errorItem.path === "PRIMARY") {
          return res
            .status(422)
            .json({ code: 422, message: "이미 가입된 이메일입니다." });
        }
        if (errorItem.path === "u_nickname") {
          return res.status(422).json({
            code: 422,
            message: "중복된 닉네임이 존재합니다.\n다른 닉네임을 사용해주세요.",
          });
        }
      });
    } else {
      return next(err);
    }
  }
});

router.post("/signin", async (req, res, next) => {
  try {
    const { u_userid, u_password } = req.body;
    const hashedPassword = await USER.findOne({
      raw: true,
      attributes: ["u_password"],
      where: { u_userid },
    });
    if (!hashedPassword) {
      return res
        .status(422)
        .json({ code: 422, message: "가입되지 않은 회원입니다." });
    }
    const isMatched = await checkPassword(
      u_password,
      hashedPassword.u_password
    );
    if (isMatched) {
      const token = getToken(u_userid);
      return res.json({ message: "정상적으로 로그인되었습니다.", token });
    }
    if (!isMatched) {
      return res
        .status(422)
        .json({ code: 422, message: "비밀번호가 일치하지 않습니다." });
    }
  } catch (err) {
    return next(err);
  }
});

router.get("/get", verifyToken, async (req, res, next) => {
  try {
    const userid = req.payload.email;
    const user = await USER.findOne({
      attributes: { exclude: ["u_password"] },
      where: { u_userid: userid },
    });
    return res.json(user);
  } catch (err) {
    return next(err);
  }
});

router.post(
  "/profile",
  verifyToken,
  fileUp.single("upload"),
  async (req, res, next) => {
    try {
      const userid = req.payload.email;
      const image = req?.file?.filename;
      const str = req?.body?.str;

      const data = {
        ...(image && { u_profileimg: image }),
        ...(str && { u_profilestr: str }),
      };

      await USER.update(data, { where: { u_userid: userid } });
      return res.json({
        message: "프로필이 변경되었습니다.",
      });
    } catch (err) {
      return next(err);
    }
  }
);

router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    code: 500,
    message: "서버 오류가 발생했습니다.\n다시 시도해주세요.",
  });
});

export default router;
