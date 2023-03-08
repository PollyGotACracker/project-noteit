import express from "express";
import sequelize from "sequelize";
import Sequelize from "sequelize";
import fileUp from "../modules/file_upload.js";
import DB from "../models/index.js";
const USER = DB.models.tbl_users;
const CAT = DB.models.tbl_categories;
const SUB = DB.models.tbl_subjects;
const KEY = DB.models.tbl_keywords;
const ATT = DB.models.tbl_attachs;
const SCO = DB.models.tbl_score;
const router = express.Router();

// router.get("/");

router.post(
  "/:userid/profile",
  fileUp.single("upload"),
  async (req, res, next) => {
    const userid = req.params.userid;
    try {
      const file = req?.file;
      const data = {
        u_profileimg: file?.filename,
        u_profilestr: req?.body?.str,
      };
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
