import express from "express";
import sequelize, { Op } from "sequelize";
import Sequelize from "sequelize";
import moment from "moment";
import DB from "../models/index.js";
const USER = DB.models.tbl_users;
const SCO = DB.models.tbl_scores;
const CAT = DB.models.tbl_categories;
const SUB = DB.models.tbl_subjects;
const KEY = DB.models.tbl_keywords;
const TODO = DB.models.tbl_todo;
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
        "s_subid",
        "s_subject",
        [sequelize.fn("sum", Sequelize.col("k_wrongcount")), "wrongcount"],
      ],
      include: {
        model: KEY,
        as: "tbl_keywords",
        attributes: [],
      },
      where: { s_catid: _cat.c_catid },
      order: [["wrongcount", "DESC"]],
      group: ["k_subid"],
    });
    const study = await SUB.findOne({
      attributes: ["s_catid", "s_subid", "s_subject", "s_keycount", "s_thumb"],
      where: { s_subid: _data[0].s_subid },
    });
    const cat = await _cat.c_category;
    // spread 안되는 이유?
    const sub = await _data.map((item) => item.s_subject);
    const wrong = await _data.map((item) => item.wrongcount);
    return res.send({ cat, sub, wrong, study });
  } catch (error) {
    console.error;
    return res.send({
      error: "노트를 북마크에 추가하고 퀴즈를 풀어보세요!",
    });
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
      attributes: [
        "sc_score",
        "sc_totalscore",
        "sc_date",
        "sc_time",
        [Sequelize.literal("sc_score / sc_totalscore * 100"), "calc"],
      ],
      where: { sc_catid: _cat.c_catid },
      order: [
        ["sc_date", "ASC"],
        ["sc_time", "ASC"],
      ],
      limit: 10,
    });

    // cf) chart.js 는 nested array 를 사용한 multiple-lines label 이 가능하다.
    const date = await _data.map((item) => [item.sc_date, item.sc_time]);
    const score = await _data.map((item) => item.sc_score);
    const totalscore = await _data.map((item) => item.sc_totalscore);
    const calc = await _data.map((item) => Math.round(item.calc));
    return res.send({ date, score, totalscore, calc });
  } catch (error) {
    console.error;
    return res.send({
      error: "통계 데이터를 가져오는 중 문제가 발생했습니다.",
    });
  }
});

router.get("/:userid/todo", async (req, res) => {
  const userid = req.params.userid;
  const today = moment().format("YYYY-MM-DD");
  try {
    const todo = await TODO.findAll({
      order: [
        ["t_deadline", "ASC"],
        ["t_prior", "ASC"],
        ["t_date", "DESC"],
        ["t_time", "DESC"],
      ],
      // complete X, expired X
      where: {
        [Op.and]: [
          { t_compdate: { [Op.notRegexp]: "[-]{1}" } },
          { t_deadline: { [Op.gte]: today } },
          { t_userid: userid },
        ],
      },
      limit: 5,
    });
    return res.send(todo);
  } catch (error) {
    console.error(error);
    return res.json({
      error: "목표 리스트를 가져오는 중 문제가 발생했습니다.",
    });
  }
});

export default router;
