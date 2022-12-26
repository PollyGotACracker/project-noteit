import express from "express";
const router = express.Router();
import DB from "../models/index.js";
const CAT = DB.models.tbl_categories;
const SUB = DB.models.tbl_subjects;
const KEY = DB.models.tbl_keywords;

router.get("/rnd/select", async (req, res) => {
  try {
    const data = await SUB.findAll({ where: { s_bookmark: 1 } });
    return res.json(data);
  } catch (error) {
    console.error(error);
    return res.send("데이터를 가져오는 데 실패했습니다.");
  }
});

export default router;
