import express from "express";
import sequelize, { Op } from "sequelize";
import Sequelize from "sequelize";
import moment from "moment";
import { verifyToken } from "../modules/user_token.js";
import DB from "../models/index.js";

const SCO = DB.models.tbl_scores;
const CAT = DB.models.tbl_categories;
const SUB = DB.models.tbl_subjects;
const KEY = DB.models.tbl_keywords;
const TODO = DB.models.tbl_todo;
const router = express.Router();

router.use("/stat", verifyToken, async (req, res, next) => {
  try {
    req.userid = req.payload.email;
    req.cat = await CAT.findOne({
      raw: true,
      attributes: ["c_catid", "c_category"],
      where: { [Op.and]: [{ c_userid: req.userid }, { c_bookmark: 1 }] },
      order: [["c_quizdate", "DESC"]],
      limit: 1,
    });
    next();
  } catch (err) {
    return next(err);
  }
});

router.get("/today", verifyToken, async (req, res, next) => {
  try {
    const userid = req.payload.email;
    const today = moment().format("YYYY-MM-DD");
    const _data = await SCO.findAll({
      raw: true,
      attributes: ["sc_score", "sc_date"],
      where: {
        [Op.and]: [{ sc_userid: userid }, { sc_date: { [Op.eq]: today } }],
      },
    });
    const todayscore = await _data.reduce((acc, cur) => acc + cur.sc_score, 0);

    return res.json({
      todayscore,
      gamecount: _data.length,
    });
  } catch (err) {
    return next(err);
  }
});

router.get("/todos", verifyToken, async (req, res, next) => {
  try {
    const userid = req.payload.email;
    const today = moment().format("YYYY-MM-DD");

    const todos = await TODO.findAll({
      order: [
        ["t_prior", "ASC"],
        ["t_deadline", "ASC"],
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

    return res.json(todos);
  } catch (err) {
    return next(err);
  }
});

router.get("/stat/wrongs", async (req, res, next) => {
  try {
    if (!req.cat?.c_catid)
      return res.json({
        category: "없음",
        wrongs: { subject: [], count: [] },
        article: {},
      });

    const category = await req.cat.c_category;
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
      where: {
        [Op.and]: [{ s_catid: req.cat.c_catid }, { s_userid: req.userid }],
      },
      order: [["wrongcount", "DESC"]],
      group: ["k_subid"],
    });

    if (_data.length <= 0)
      return res.json({
        category,
        wrongs: { subject: [], count: [] },
        article: {},
      });

    const subject = await _data.map((item) => item.s_subject).splice(0, 10);
    const count = await _data.map((item) => item.wrongcount).splice(0, 10);
    const rndIdx = Math.floor(Math.random() * _data.length);
    const article = await SUB.findOne({
      attributes: ["s_catid", "s_subid", "s_subject", "s_keycount", "s_thumb"],
      where: { s_subid: _data[rndIdx].s_subid },
    });

    return res.json({ category, wrongs: { subject, count }, article });
  } catch (err) {
    return next(err);
  }
});

router.get("/stat/scores", async (req, res, next) => {
  try {
    if (!req.cat?.c_catid)
      return res.json({
        category: "없음",
        date: [],
        score: [],
        totalscore: [],
        percent: [],
      });

    const category = await req.cat.c_category;
    let _data = await SCO.findAll({
      raw: true,
      attributes: [
        "sc_score",
        "sc_totalscore",
        "sc_date",
        "sc_time",
        [Sequelize.literal("sc_score / sc_totalscore * 100"), "calc"],
      ],
      where: {
        [Op.and]: [{ sc_catid: req.cat.c_catid }, { sc_userid: req.userid }],
      },
      order: [
        ["sc_date", "DESC"],
        ["sc_time", "DESC"],
      ],
      limit: 10,
    });

    // cf) chart.js 는 nested array 를 사용한 multiple-lines label 이 가능하다.
    const date = await _data.map((item) => [item.sc_date, item.sc_time]);
    const score = await _data.map((item) => item.sc_score);
    const totalscore = await _data.map((item) => item.sc_totalscore);
    const percent = await _data.map((item) => Math.round(item.calc));

    return res.json({ category, scores: { date, score, totalscore, percent } });
  } catch (err) {
    return next(err);
  }
});

export default router;
