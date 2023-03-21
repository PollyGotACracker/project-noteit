import express from "express";
import sequelize from "sequelize";
import Sequelize from "sequelize";
import { QueryTypes } from "sequelize";
import fileUp from "../modules/file_upload.js";
import { sanitizer } from "../modules/sanitize_html.js";
import { v4 } from "uuid";
import moment from "moment";
import DB from "../models/index.js";
const CAT = DB.models.tbl_categories;
const SUB = DB.models.tbl_subjects;
const KEY = DB.models.tbl_keywords;
const ATT = DB.models.tbl_attachs;
const SCO = DB.models.tbl_score;
const router = express.Router();

// SELECT all categories
router.get("/cat", async (req, res, next) => {
  try {
    const catList = await CAT.findAll({
      raw: true,
      order: [
        ["c_bookmark", "DESC"],
        ["c_category", "ASC"],
      ],
    });
    return res.json({ result: catList });
  } catch (error) {
    console.error(error);
    return res.send({ error: "SELECT 실행 중 문제가 발생했습니다." });
  }
});

// INSERT category
router.post("/cat/insert", async (req, res, next) => {
  try {
    let data = req.body;
    await CAT.create(data);
    return res.send({ result: "정상적으로 등록되었습니다." });
  } catch (err) {
    console.error(err);
    return res.send({ error: "중복되는 카테고리 이름이 있습니다." });
  }
});

// UPDATE category
router.patch("/cat/update", async (req, res, next) => {
  try {
    const catid = req.body.c_catid;
    const value = req.body.c_category;
    await CAT.update({ c_category: value }, { where: { c_catid: catid } });
    await SUB.update({ s_category: value }, { where: { s_catid: catid } });
    await SCO.update({ sc_category: value }, { where: { sc_catid: catid } });
    return res.send({ result: "정상적으로 수정되었습니다." });
  } catch (err) {
    console.error(err);
    return res.send({ error: "UPDATE 실행 중 문제가 발생했습니다." });
  }
});

// category bookmark toggle
router.patch("/cat/bookmark", async (req, res, next) => {
  try {
    const catid = req.body.catid;
    const bookmark = req.body.bookmark;
    const value = bookmark === 0 ? 1 : 0;
    await CAT.update({ c_bookmark: value }, { where: { c_catid: catid } });
    return res.send({ result: value });
  } catch (error) {
    console.error(error);
    return res.send({
      error: "카테고리 북마크 SQL 실행 중 문제가 발생했습니다.",
    });
  }
});

// DELETE category
router.delete("/cat/:catid/delete", async (req, res, next) => {
  const catid = req.params.catid;
  try {
    let subid = await SUB.findAll({
      raw: true,
      where: { s_catid: catid },
    });
    subid = subid[0]?.s_subid || "";
    await KEY.destroy({ where: { k_subid: subid } });
    await SUB.destroy({ where: { s_subid: subid } });
    await CAT.destroy({ where: { c_catid: catid } });

    return res.send({ result: "정상적으로 삭제되었습니다." });
  } catch (err) {
    console.error(err);
    return res.send({ error: "DELETE 실행 중 문제가 발생했습니다." });
  }
});

// SELECT specific category data (when SELECT/UPDATE subject, keywords)
router.get("/cat/write/:catid", async (req, res, next) => {
  const catid = req.params.catid;

  try {
    const category = await CAT.findAll({
      attributes: ["c_category"],
      where: { c_catid: catid },
    });
    console.log(category);
    return res.send(category);
  } catch (error) {
    console.error(err);
    return res.send({ error: "SQL query 실행 중 문제가 발생했습니다." });
  }
});

// SELECT all subjects (in specific category)
router.get("/cat/:catid", async (req, res, next) => {
  const catid = req.params.catid;

  try {
    const category = await CAT.findAll({
      raw: true,
      where: { c_catid: catid },
    });

    const subList = await SUB.findAll({
      raw: true,
      order: [
        ["s_bookmark", "DESC"],
        ["s_subject", "ASC"],
      ],
      where: { s_catid: catid },
    });
    return res.send({ category, subList });
  } catch (error) {
    console.error(error);
    return res.send({ error: "SQL query 실행 중 문제가 발생했습니다." });
  }
});

// ** item 클릭 후 뒤로 가기 하면 화면이 초기화
// input 값을 지우면 원래 목록으로 되돌아가지 않음
// search
router.post("/search", async (req, res) => {
  const value = req.body.value;
  try {
    let result;
    if (value === "") {
      result = await SUB.findAll({
        raw: true,
        order: [["s_subject", "ASC"]],
        attributes: [
          "s_subid",
          "s_subject",
          "s_catid",
          "s_bookmark",
          [sequelize.fn("count", Sequelize.col("k_keyid")), "length"],
        ],
        include: {
          model: KEY,
          as: "tbl_keywords",
        },
        group: ["tbl_subjects.s_subid"],
      });
    } else {
      result = await DB.sequelize.query(
        `SELECT s_subid, s_subject, s_catid, s_bookmark, COUNT(tbl_keywords.k_keyid) AS length 
        FROM tbl_subjects INNER JOIN tbl_keywords ON s_subid = k_subid 
        WHERE
          s_subject LIKE "%${value}%" 
          OR s_content LIKE "%${value}%" 
          OR tbl_keywords.k_keyword LIKE "%${value}%"
          
        GROUP BY s_subid ORDER BY s_subject`,
        {
          type: QueryTypes.SELECT,
        }
      );
    }
    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.send({ error: "SQL query 실행 중 문제가 발생했습니다." });
  }
});

// subject bookmark toggle
router.patch("/sub/bookmark/:subid", async (req, res) => {
  try {
    const subid = req.params.subid;
    const bookmark = await SUB.findOne({
      raw: true,
      attributes: ["s_bookmark"],
      where: { s_subid: subid },
    });
    const value = bookmark.s_bookmark === 0 ? 1 : 0;
    await SUB.update({ s_bookmark: value }, { where: { s_subid: subid } });

    let msg;
    if (value === 1) msg = "북마크 추가되었습니다.";
    if (value === 0) msg = "북마크 해제되었습니다.";

    return res.send({ result: value, MESSAGE: msg });
  } catch (error) {
    console.error(error);
    return res.send({ error: "SQL query 실행 중 문제가 발생했습니다." });
  }
});

// INSERT attach
router.post("/upload", fileUp.single("upload"), async (req, res, next) => {
  try {
    const file = req.file;
    console.log(req.file);
    const uploadFileInfo = {
      a_attid: v4().substring(0, 8),
      a_subid: req.body.subid,
      a_date: moment().format("YYYY[-]MM[-]DD"),
      a_time: moment().format("HH:mm:ss"),
      a_originalname: file.originalname,
      a_savename: file.filename,
      a_ext: file.mimetype,
    };
    const result = await ATT.create(uploadFileInfo);
    console.log(result);
    return res.json({
      uploaded: true,
      url: uploadFileInfo.a_savename,
    });
  } catch (err) {
    console.error(err);
  }
});

// INSERT subject
router.post("/sub/insert", sanitizer, async (req, res, next) => {
  try {
    const keywords = req.body.keywords;
    const subjects = {
      ...req.body.subjects,
      s_keycount: keywords.length,
      s_content: req.filtered,
    };

    await SUB.create(subjects);
    await KEY.bulkCreate(keywords);
    await CAT.increment("c_subcount", {
      by: 1,
      where: { c_catid: subjects.s_catid },
    });
    return res.send({ result: "정상적으로 추가되었습니다." });
  } catch (error) {
    console.error(error);
    return res.send({ error: "SQL query 실행 중 문제가 발생했습니다." });
  }
});

// subject details
router.get("/sub/:subid", async (req, res, next) => {
  const subid = req.params.subid;

  try {
    const subject = await SUB.findAll({
      where: { s_subid: subid },
    });
    const keywords = await KEY.findAll({
      where: { k_subid: subid },
      order: [["k_index", "ASC"]],
    });
    return res.send({ subject, keywords });
  } catch (error) {
    console.error(error);
    return res.send({ error: "SQL query 실행 중 문제가 발생했습니다." });
  }
});

// UPDATE subject
router.patch("/sub/update", sanitizer, async (req, res, next) => {
  try {
    const keywords = req.body.keywords;
    const subjects = {
      ...req.body.subjects,
      s_keycount: keywords.length,
      s_content: req.filtered,
    };
    await SUB.update(subjects, { where: { s_subid: subjects.s_subid } });
    await KEY.destroy({ where: { k_subid: subjects.s_subid } });
    await KEY.bulkCreate(keywords);
    return res.send({ result: "정상적으로 수정되었습니다." });
  } catch (error) {
    console.error(error);
    return res.send({ error: "SQL query 실행 중 문제가 발생했습니다." });
  }
});

// DELETE subject
router.delete("/sub/:catid/:subid/delete", async (req, res, next) => {
  try {
    const catid = req.params.catid;
    const subid = req.params.subid;

    await KEY.destroy({ where: { k_subid: subid } });
    await SUB.destroy({ where: { s_subid: subid } });
    await CAT.decrement("c_subcount", {
      by: 1,
      where: { c_catid: catid },
    });
    return res.send({ result: "정상적으로 삭제되었습니다." });
  } catch (error) {
    console.error(error);
    return res.send({ error: "SQL query 실행 중 문제가 발생했습니다." });
  }
});

export default router;
