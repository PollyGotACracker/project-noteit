import express from "express";
import Sequelize from "Sequelize";
import DB from "../models/index.js";
const CAT = DB.models.tbl_categories;
const SUB = DB.models.tbl_subjects;
const KEY = DB.models.tbl_keywords;

const router = express.Router();

router.get("/rnd/get", async (req, res) => {
  try {
    const data = await SUB.findAll({
      raw: true,
      attributes: ["s_subid", "s_subject", "s_keycount"],
      where: { s_bookmark: 1 },
      include: {
        model: KEY,
        as: "tbl_keywords",
        order: Sequelize.literal("rand()"),
      },
      limit: 5,
    });

    const getNested = (data, prop) => {};
    // if (data.length === 0) {
    //   return res.send({ result: "북마크된 주제가 없습니다." });
    // }
    // else {
    return res.json(data);
    // }
  } catch (error) {
    console.error(error);
    return res.send({ error: "데이터를 가져오는 데 실패했습니다." });
  }
});

export default router;
