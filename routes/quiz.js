import express from "express";
import Sequelize from "Sequelize";
import sequelize, { Op } from "sequelize";
import DB from "../models/index.js";
const CAT = DB.models.tbl_categories;
const SUB = DB.models.tbl_subjects;
const KEY = DB.models.tbl_keywords;

const router = express.Router();

router.get("/cat/get", async (req, res) => {
  try {
    const data = await CAT.findAll({
      attributes: [
        "c_catid",
        "c_category",
        "c_subcount",
        [
          sequelize.fn("COUNT", sequelize.col("tbl_subjects.s_subid")),
          "c_subcount",
        ],
        [
          sequelize.fn("SUM", sequelize.col("tbl_subjects.s_keycount")),
          "s_keycount",
        ],
      ],
      where: { [Op.and]: [{ c_bookmark: 1 }, { c_subcount: { [Op.gt]: 0 } }] },
      include: {
        model: SUB,
        as: "tbl_subjects",
        attributes: [],
        where: {
          [Op.and]: [{ s_bookmark: 1 }, { s_keycount: { [Op.gt]: 0 } }],
        },
      },
      group: ["c_catid"],
    });
    console.log(data);
    return res.json({ data: data });
  } catch (error) {
    console.log(error);
    return res.send({ error: "카테고리를 가져오는 중 문제가 발생했습니다." });
  }
});

router.get("/:catid/rndsub/get", async (req, res) => {
  const catid = req.params.catid;
  try {
    const data = await SUB.findAll({
      attributes: [
        "s_catid",
        "s_subid",
        "s_subject",
        "s_category",
        "s_keycount",
      ],
      where: {
        [Op.and]: [
          { s_bookmark: 1 },
          { s_catid: catid },
          { s_keycount: { [Op.gt]: 0 } },
        ],
      },
      include: {
        attributes: ["k_keyid", "k_keyword", "k_desc", "k_wrongcount"],
        model: KEY,
        as: "tbl_keywords",
        order: Sequelize.literal("RAND()"),
      },
      // order: Sequelize.literal("RAND()"),
    });
    console.log(data);
    return res.json({ data: data });
  } catch (error) {
    console.log(error);
    return res.send({ error: "데이터를 가져오는 중 문제가 발생했습니다." });
  }
});

export default router;
