import express from "express";
import { Op } from "sequelize";
import DB from "../models/index.js";
const SUB = DB.models.tbl_subjects;
const KEY = DB.models.tbl_keywords;
const router = express.Router();

// search
router.get("/:userid", async (req, res) => {
  const userid = req.params.userid;
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
        [Op.and]: [
          { s_userid: userid },
          {
            [Op.or]: [
              { s_subject: { [Op.regexp]: regexp } },
              { s_content: { [Op.regexp]: regexp } },
              { ["$tbl_keywords.k_keyword$"]: { [Op.regexp]: regexp } },
              { ["$tbl_keywords.k_desc$"]: { [Op.regexp]: regexp } },
            ],
          },
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
    console.error(err);
    res.status(500).json({
      code: 500,
      message: "서버 오류가 발생했습니다.\n다시 시도해주세요.",
    });
  }
});

export default router;
