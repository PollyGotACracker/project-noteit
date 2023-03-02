import express from "express";
import sequelize from "sequelize";
import DB from "../models/index.js";
const CAT = DB.models.tbl_categories;
const SUB = DB.models.tbl_subjects;
const KEY = DB.models.tbl_keywords;

const router = express.Router();

router.get("/rnd/select", async (req, res) => {
  try {
    const data = await SUB.findAll({
      attributes: [
        "s_subid",
        "s_subject",
        // [sequelize.fn("count", sequelize.col("k_keyid")), "length"],
      ],
      where: { s_bookmark: 1 },
      include: [
        {
          model: KEY,
          as: "tbl_keywords",
        },
      ],
    });
    return res.json(data);
  } catch (error) {
    console.error(error);
    return res.send({ error: "데이터를 가져오는 데 실패했습니다." });
  }
});

export default router;
