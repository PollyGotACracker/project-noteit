import express from "express";
import sequelize, { Op } from "sequelize";
import DB from "../models/index.js";
const USER = DB.models.tbl_users;
const CAT = DB.models.tbl_categories;
const SUB = DB.models.tbl_subjects;
const KEY = DB.models.tbl_keywords;
const SCO = DB.models.tbl_scores;
const router = express.Router();

router.get("/cat/get", async (req, res) => {
  try {
    const data = await CAT.findAll({
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
          { s_catid: catid },
          { s_keycount: { [Op.gt]: 0 } },
        ],
      },
      include: {
        attributes: ["k_keyid", "k_keyword", "k_desc", "k_wrongcount"],
        model: KEY,
        as: "tbl_keywords",
      },
    });
    console.log(data);
    return res.json({ data: data });
  } catch (error) {
    console.log(error);
    return res.send({ error: "데이터를 가져오는 중 문제가 발생했습니다." });
  }
});

router.post("/score/insert", async (req, res, next) => {
  try {
    const data = req.body;
    await SCO.create(data);
    return res.send({ result: "퀴즈 기록이 저장되었습니다." });
  } catch (error) {
    console.error(error);
    return res.send({ error: "이미 저장된 기록입니다." });
  }
});

router.patch("/cat/update", async (req, res, next) => {
  try {
    const catid = req.body.catid;
    const date = req.body.date;
    await CAT.update({ c_quizdate: date }, { where: { c_catid: catid } });
    return res.send({ result: "퀴즈 기록이 저장되었습니다." });
  } catch (error) {
    console.error(error);
    return res.send({ error: "노트 정보 기록 중 문제가 발생했습니다." });
  }
});

router.patch("/key/update", async (req, res, next) => {
  try {
    const keyids = req.body;
    for (let key of keyids) {
      await KEY.increment("k_wrongcount", { by: 1, where: { k_keyid: key } });
    }
    return res.send({ result: "퀴즈 기록이 저장되었습니다." });
  } catch (error) {
    console.error(error);
    return res.send({ error: "키워드 정보 기록 중 문제가 발생했습니다." });
  }
});

router.patch("/user/update", async (req, res, next) => {
  try {
    const userid = req.body.userid;
    const score = req.body.userscore;
    let userscore = await USER.findOne({
      raw: true,
      attributes: ["u_score"],
      where: { u_userid: userid },
    });
    userscore = Number(userscore.u_score) + Number(score);
    await USER.update({ u_score: userscore }, { where: { u_userid: userid } });
    return res.send({ result: "퀴즈 기록이 저장되었습니다." });
  } catch (error) {
    console.error(error);
    return res.send({ error: "사용자 점수 기록 중 문제가 발생했습니다." });
  }
});

export default router;
