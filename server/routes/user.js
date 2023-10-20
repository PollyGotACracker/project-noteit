import express from "express";
import { Sequelize } from "sequelize";
import fileUp from "../modules/file_upload.js";
import { checkPassword, hashPassword } from "../modules/password_hash.js";
import {
  getRefresh,
  getToken,
  verifyRefresh,
  verifyToken,
} from "../modules/user_token.js";
import { checkSignUpData } from "../modules/auth_validation.js";
import { checkNewUser } from "../modules/check_user.js";
import { sendAuthCode, verifyAuthCode } from "../modules/email_sending.js";
import DB from "../models/index.js";

const USER = DB.models.tbl_users;
const CAT = DB.models.tbl_categories;
const SUB = DB.models.tbl_subjects;
const KEY = DB.models.tbl_keywords;
const ATT = DB.models.tbl_attachs;
const SCO = DB.models.tbl_scores;
const TODO = DB.models.tbl_todo;
const router = express.Router();

router.post("/signup/send-code", checkNewUser, sendAuthCode);

router.post("/signup/verify-code", verifyAuthCode);

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

router.post("/signin", getToken, getRefresh, async (req, res, next) => {
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
    if (!isMatched) {
      return res
        .status(422)
        .json({ code: 422, message: "비밀번호가 일치하지 않습니다." });
    }

    return res.json({
      message: "정상적으로 로그인되었습니다.",
    });
  } catch (err) {
    return next(err);
  }
});

router.post("/token", verifyRefresh, getToken, async (req, res, next) => {
  try {
    return res.json({
      code: "ACCESS_TOKEN",
      message: "토큰이 정상적으로 발급되었습니다.",
    });
  } catch (err) {
    return next(err);
  }
});

router.get("/profile", verifyToken, async (req, res, next) => {
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

router.post("/password/change", verifyToken, async (req, res, next) => {
  try {
    const userid = req.payload.email;
    const { u_password, value } = req.body;
    const _data = await USER.findByPk(userid);
    const isMatched = await checkPassword(u_password, _data.u_password);
    if (!isMatched) {
      return res
        .status(422)
        .json({ code: 422, message: "비밀번호가 일치하지 않습니다." });
    } else {
      const newPassword = await hashPassword(value);
      await USER.update(
        { u_password: newPassword },
        { where: { u_userid: userid } }
      );
    }
    return res.json({ message: "비밀번호가 정상적으로 변경되었습니다." });
  } catch (err) {
    return next(err);
  }
});

router.delete("/account", verifyToken, async (req, res, next) => {
  try {
    const userid = req.payload.email;
    const { u_password } = req.body;
    const _data = await USER.findByPk(userid);
    const isMatched = await checkPassword(u_password, _data.u_password);
    if (!isMatched) {
      return res.status(422).json({ message: "비밀번호가 일치하지 않습니다." });
    } else {
      await DB.sequelize.transaction(async () => {
        await TODO.destroy({ where: { t_userid: userid } });
        await SCO.destroy({ where: { sc_userid: userid } });
        await ATT.destroy({ where: { a_userid: userid } });
        await KEY.destroy({ where: { k_userid: userid } });
        await SUB.destroy({ where: { s_userid: userid } });
        await CAT.destroy({ where: { c_userid: userid } });
        await USER.destroy({ where: { u_userid: userid } });
      });
      return res.json({
        message: "계정이 정상적으로 삭제되었습니다.\n이용해주셔서 감사합니다.",
      });
    }
  } catch (err) {
    return next(err);
  }
});

router.post("/signout", (req, res) => {
  res.clearCookie("refreshToken", { httpOnly: true });
  res.status(200).json({ message: "로그아웃되었습니다." });
});

router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    code: 500,
    message: "서버 오류가 발생했습니다.\n다시 시도해주세요.",
  });
});

export default router;
