import express from "express";
import DB from "../models/index.js";
const USER = DB.models.tbl_users;
const router = express.Router();

router.get("/user/get", async (req, res) => {
  try {
    const _temp = "polly@gmail.com";
    const user = await USER.findOne({ where: { u_userid: _temp } });
    return res.send({ data: user });
  } catch (error) {
    console.error;
    return res.send({ error: "유저 정보를 불러오지 못했습니다." });
  }
});
export default router;
