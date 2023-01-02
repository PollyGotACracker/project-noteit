import express from "express";
import sequelize from "sequelize";
import Sequelize from "sequelize";
import DB from "../models/index.js";
const CAT = DB.models.tbl_categories;
const SUB = DB.models.tbl_subjects;
const KEY = DB.models.tbl_keywords;

const router = express.Router();

router.get("/rnd/select", async (req, res) => {
  try {
    const data = await SUB.findAll({
      raw: true,
      attributes: [
        "s_subject",
        // [sequelize.fn("count", sequelize.col("k_keyid")), "length"],
      ],
      where: { s_bookmark: 1 },
      include: [
        {
          model: KEY,
          as: "f_key",
          attributes: [[sequelize.col("k_keyword"), "keyword"]],
        },
      ],
      // group: ["tbl_subjects.s_subid"],
    });

    const keys = await SUB.findAll({
      raw: true,
      include: "f_key",
    });
    console.log(keys);

    //   const data = await DB.sequelize.query(
    //     `SELECT s_subject, k_keyword, COUNT(tbl_keywords.k_keyid) AS length
    // FROM tbl_subjects INNER JOIN tbl_keywords ON s_subid = k_subid
    // WHERE s_bookmark = 1 GROUP BY k_subid`,
    //     {
    //       type: QueryTypes.SELECT,
    //     }
    //   );

    return res.json(data);
  } catch (error) {
    console.error(error);
    return res.send({ error: "데이터를 가져오는 데 실패했습니다." });
  }
});

export default router;
