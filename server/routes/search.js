import express from "express";
import { Op } from "sequelize";
import DB from "../models/index.js";
const SUB = DB.models.tbl_subjects;
const KEY = DB.models.tbl_keywords;
const router = express.Router();

// search
router.get("/", async (req, res) => {
  const value = req.query.value;
  try {
    let regexp = value
      ?.split(" ")
      ?.filter((item) => item !== "")
      .join("|");
    regexp = `(${regexp})`;

    const result = await SUB.findAll({
      include: {
        model: KEY,
        as: "tbl_keywords",
      },
      where: {
        [Op.or]: [
          { s_subject: { [Op.regexp]: regexp } },
          { s_content: { [Op.regexp]: regexp } },
          { ["$tbl_keywords.k_keyword$"]: { [Op.regexp]: regexp } },
          { ["$tbl_keywords.k_desc$"]: { [Op.regexp]: regexp } },
        ],
      },
      order: [
        ["s_category", "ASC"],
        ["s_subject", "ASC"],
        [KEY, "k_index", "ASC"],
      ],
    });
    return res.json({ result, regexp });
  } catch (err) {
    console.log(err);
    return res.json({ error: "SQL query 실행 중 문제가 발생했습니다." });
  }
});

export default router;
