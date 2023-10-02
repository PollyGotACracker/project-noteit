import express from "express";
import { Sequelize } from "sequelize";
import fileUp from "../modules/file_upload.js";
import { hashPassword } from "../modules/password_hash.js";
import { checkSignUpData } from "../modules/auth_validation.js";
import DB from "../models/index.js";

const USER = DB.models.tbl_users;
const router = express.Router();

router.post("/signup", checkSignUpData, async (req, res) => {
  try {
    const data = req.body;
    const hashedPassword = await hashPassword(data.u_pwd);
    if (hashedPassword) await USER.create(data);
    return res.json({ message: "가입을 환영합니다!" });
  } catch (err) {
    if (err instanceof Sequelize.UniqueConstraintError) {
      err.errors.forEach((errorItem) => {
        if (errorItem.path === "PRIMARY") {
          return res.status(422).json({ message: "이미 가입된 이메일입니다." });
        }
        if (errorItem.path === "u_nickname") {
          return res.status(422).json({
            message: "중복된 닉네임이 존재합니다.\n다른 닉네임을 사용해주세요.",
          });
        }
      });
    } else {
      console.error(err);
      return res
        .status(500)
        .json({ message: "서버에 문제가 발생했습니다.\n다시 시도해주세요." });
    }
  }
});

router.post("/signin", async (req, res) => {});

router.get("/get", async (req, res) => {
  try {
    const _temp = "polly@gmail.com";
    const user = await USER.findOne({
      attributes: { exclude: ["u_pwd"] },
      where: { u_userid: _temp },
    });
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "유저 정보를 불러오지 못했습니다." });
  }
});

router.post("/:userid/profile", fileUp.single("upload"), async (req, res) => {
  try {
    const userid = req.params.userid;
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
    console.error(err);
    return res.status(500).json({
      message: "프로필 변경 중 문제가 발생했습니다.",
    });
  }
});

export default router;
