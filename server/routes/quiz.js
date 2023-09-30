import express from "express";
import sequelize, { Op } from "sequelize";
import DB from "../models/index.js";
const USER = DB.models.tbl_users;
const CAT = DB.models.tbl_categories;
const SUB = DB.models.tbl_subjects;
const KEY = DB.models.tbl_keywords;
const SCO = DB.models.tbl_scores;
const router = express.Router();

router.get("/cats/:userId/get", async (req, res) => {
  try {
    const userId = req.params.userId;
    const cats = await CAT.findAll({
      attributes: [
        "c_catid",
        "c_category",
        "c_quizdate",
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
      where: {
        [Op.and]: [
          { c_userid: userId },
          { c_bookmark: 1 },
          { c_subcount: { [Op.gt]: 0 } },
        ],
      },
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
    return res.json(cats);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "노트 목록을 가져오는 중 문제가 발생했습니다.",
    });
  }
});

router.get("/random/:catId/get", async (req, res) => {
  const catId = req.params.catId;
  try {
    // order: [Sequelize.fn("RAND")], order: [sequelize.random()] 다 안되는 이유??
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
          { s_catid: catId },
          { s_keycount: { [Op.gt]: 0 } },
        ],
      },
      include: {
        attributes: ["k_keyid", "k_keyword", "k_desc", "k_wrongcount"],
        model: KEY,
        as: "tbl_keywords",
      },
    });

    const rndData = [...data];
    const length = rndData.length;
    const iteration = (length - 1) * 5; // 배열 크기의 4 ~ 5배
    let i = 0;
    while (i < iteration) {
      const _i = Math.floor(Math.random() * length);
      const _j = Math.floor(Math.random() * length);
      [rndData[_j], rndData[_i]] = [rndData[_i], rndData[_j]];
      i++;
    }

    return res.json(rndData);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "노트 데이터를 가져오는 중 문제가 발생했습니다.",
    });
  }
});

router.post("/score/insert", async (req, res) => {
  try {
    const data = req.body;
    await SCO.create(data);
    return res.json({ message: "퀴즈 기록이 저장되었습니다." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "이미 저장된 기록입니다." });
  }
});

router.patch("/score/update", async (req, res) => {
  try {
    await DB.sequelize.transaction(async () => {
      const { catid, date } = req.body;
      await CAT.update({ c_quizdate: date }, { where: { c_catid: catid } });

      const { keyids } = req.body;
      for (let key of keyids) {
        await KEY.increment("k_wrongcount", { by: 1, where: { k_keyid: key } });
      }

      const { userid, quizscore } = req.body;
      const _userscore = await USER.findOne({
        raw: true,
        attributes: ["u_score"],
        where: { u_userid: userid },
      });
      const newQuizscore = Number(_userscore.u_score) + Number(quizscore);
      await USER.update(
        { u_score: newQuizscore },
        { where: { u_userid: userid } }
      );
    });
    return res.json({ message: "퀴즈 기록이 저장되었습니다." });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "퀴즈 기록 저장 중 문제가 발생했습니다." });
  }
});

export default router;
