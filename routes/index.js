import express from "express";
import sequelize, { Op } from "sequelize";
import Sequelize from "sequelize";
import DB from "../models/index.js";
const USER = DB.models.tbl_users;
const SCO = DB.models.tbl_scores;
const CAT = DB.models.tbl_categories;
const SUB = DB.models.tbl_subjects;
const KEY = DB.models.tbl_keywords;
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

// latest solved category each round data
router.get("/:userid/stat/round", async (req, res) => {
  try {
    const userid = req.params.userid;
    let _cat = await CAT.findOne({
      raw: true,
      attributes: ["c_catid", "c_category"],
      where: { [Op.and]: [{ c_userid: userid }, { c_bookmark: 1 }] },
      order: [["c_quizdate", "DESC"]],
      limit: 1,
    });
    let _data = await SCO.findAll({
      raw: true,
      attributes: ["sc_score", "sc_date", "sc_time"],
      where: { sc_catid: _cat.c_catid },
    });
    // cf) chart.js 는 nested array 를 사용한 multiple-lines label 이 가능하다.
    const date = await _data.map((item) => [item.sc_date, item.sc_time]);
    const score = await _data.map((item) => item.sc_score);
    return res.send({ date, score });
  } catch (error) {
    console.error;
    return res.send({
      error: "통계 데이터를 가져오는 중 문제가 발생했습니다.",
    });
  }
});

// latest solved category wrong count data
router.get("/:userid/stat/wrong", async (req, res) => {
  try {
    const userid = req.params.userid;
    let _cat = await CAT.findOne({
      raw: true,
      attributes: ["c_catid", "c_category"],
      where: { [Op.and]: [{ c_userid: userid }, { c_bookmark: 1 }] },
      order: [["c_quizdate", "DESC"]],
      limit: 1,
    });
    let _data = await SUB.findAll({
      raw: true,
      nest: true,
      attributes: [
        "s_subject",
        [sequelize.fn("sum", Sequelize.col("k_wrongcount")), "wrongcount"],
      ],
      include: {
        model: KEY,
        as: "tbl_keywords",
        attributes: [],
      },
      where: { s_catid: _cat.c_catid },
      group: ["k_subid"],
    });

    const cat = await _cat.c_category;
    // spread 안되는 이유?
    const sub = await _data.map((item) => item.s_subject);
    const wrong = await _data.map((item) => item.wrongcount);
    return res.send({ cat, sub, wrong });
  } catch (error) {
    console.error;
    return res.send({
      error: "통계 데이터를 가져오는 중 문제가 발생했습니다.",
    });
  }
});

export default router;
