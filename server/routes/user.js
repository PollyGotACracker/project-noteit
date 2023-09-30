import express from "express";
import fileUp from "../modules/file_upload.js";
import DB from "../models/index.js";
const USER = DB.models.tbl_users;
const router = express.Router();

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
