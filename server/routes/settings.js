import express from "express";
import fileUp from "../modules/file_upload.js";
import DB from "../models/index.js";
const USER = DB.models.tbl_users;
const router = express.Router();

// router.get("/");

router.post(
  "/:userid/profile",
  fileUp.single("upload"),
  async (req, res, next) => {
    const userid = req.params.userid;
    try {
      const file = req?.file;
      // const uploadFileInfo = {
      //   a_attid: v4().substring(0, 8),
      //   a_subid: req.body.subid,
      //   a_date: moment().format("YYYY[-]MM[-]DD"),
      //   a_time: moment().format("HH:mm:ss"),
      //   a_originalname: file.originalname,
      //   a_savename: file.filename,
      //   a_ext: file.mimetype,
      // };
      const data = {
        u_profileimg: file?.filename,
        u_profilestr: req?.body?.str,
      };
      // await ATT.insert(uploadFileInfo);
      const result = await USER.update(data, { where: { u_userid: userid } });

      console.log(result);
      return res.send({
        result: "프로필이 변경되었습니다.",
      });
    } catch (err) {
      console.error(err);
      return res.send({
        error: "프로필 변경 중 문제가 발생했습니다.",
      });
    }
  }
);

export default router;
