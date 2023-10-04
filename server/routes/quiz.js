import express from "express";
import sequelize, { Op, Sequelize } from "sequelize";
import { verifyToken } from "../modules/user_token.js";
import randomizeData from "../modules/randomize_data.js";
import DB from "../models/index.js";

const USER = DB.models.tbl_users;
const CAT = DB.models.tbl_categories;
const SUB = DB.models.tbl_subjects;
const KEY = DB.models.tbl_keywords;
const SCO = DB.models.tbl_scores;
const router = express.Router();

router.get("/cats/get", verifyToken, async (req, res, next) => {
  try {
    const userid = req.payload.email;
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
          { c_userid: userid },
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
    return next(err);
  }
});

router.get("/random/:catId/get", verifyToken, async (req, res, next) => {
  const userid = req.payload.email;
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
          { s_userid: userid },
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

    const rndSubs = randomizeData(data);
    for (let subject of rndSubs) {
      const rndKeys = randomizeData(subject.tbl_keywords);
      subject.tbl_keywords = rndKeys;
    }
    return res.json(rndSubs);
  } catch (err) {
    return next(err);
  }
});

router.post("/score/insert", verifyToken, async (req, res, next) => {
  try {
    const data = req.body;
    data.sc_userid = req.payload.email;
    await SCO.create(data);
    return res.json({ message: "퀴즈 기록이 저장되었습니다." });
  } catch (err) {
    if (err instanceof Sequelize.UniqueConstraintError) {
      err.errors.forEach((errorItem) => {
        if (errorItem.path === "PRIMARY") {
          return res
            .status(422)
            .json({ code: 422, message: "이미 저장된 기록입니다." });
        }
      });
    } else {
      return next(err);
    }
  }
});

router.patch("/score/update", verifyToken, async (req, res, next) => {
  try {
    const userid = req.payload.email;

    await DB.sequelize.transaction(async () => {
      const { catid, date } = req.body;
      await CAT.update(
        { c_quizdate: date },
        {
          where: {
            [Op.and]: [{ c_catid: catid }, { c_userid: userid }],
          },
        }
      );

      const { keyids } = req.body;
      for (let key of keyids) {
        await KEY.increment("k_wrongcount", {
          by: 1,
          where: { [Op.and]: [{ k_keyid: key }, { k_userid: userid }] },
        });
      }

      const { quizscore } = req.body;
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
    return next(err);
  }
});

router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    code: 500,
    message: "서버 오류가 발생했습니다.\n다시 시도해주세요.",
  });
});

export default router;
