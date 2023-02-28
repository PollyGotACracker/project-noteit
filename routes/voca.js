import express from "express";
import sequelize, { UUID } from "sequelize";
import Sequelize from "sequelize";
import { QueryTypes } from "sequelize";
import { Op } from "sequelize";
import { v4 } from "uuid";
import moment from "moment";
import fileUp from "../modules/file_upload.js";
import DB from "../models/index.js";
const CAT = DB.models.tbl_categories;
const SUB = DB.models.tbl_subjects;
const KEY = DB.models.tbl_keywords;
const ATT = DB.models.tbl_attachs;
const router = express.Router();

// 모든 category SELECT
router.get("/cat", async (req, res, next) => {
  try {
    const catList = await CAT.findAll({
      raw: true,
      order: [["c_category", "ASC"]],
      include: [
        {
          model: SUB,
          as: "tbl_subjects",
          attributes: [
            [sequelize.fn("count", Sequelize.col("s_subid")), "length"],
          ],
        },
      ],
      group: ["tbl_categories.c_catid"],
    });
    return res.json(catList);
  } catch (error) {
    console.error(error);
    return res.send({ error: "SELECT 실행 중 문제가 발생했습니다." });
  }
});

// category INSERT
router.post("/cat/insert", async (req, res, next) => {
  try {
    let data = req.body;
    await CAT.create(data);
    return res.send({ result: "정상적으로 등록되었습니다." });
  } catch (err) {
    console.error(err);
    return res.send({ error: "INSERT 실행 중 문제가 발생했습니다." });
  }
});

// category UPDATE
router.put("/cat/update", async (req, res, next) => {
  try {
    const catid = req.body.c_catid;
    const value = req.body.c_category;
    await CAT.update({ c_category: value }, { where: { c_catid: catid } });
    await SUB.update({ s_category: value }, { where: { s_catid: catid } });
    return res.send({ result: "정상적으로 수정되었습니다." });
  } catch (err) {
    console.error(err);
    return res.send({ error: "UPDATE 실행 중 문제가 발생했습니다." });
  }
});

// category DELETE
router.delete("/cat/delete/:catid", async (req, res, next) => {
  try {
    const catid = req.params.catid;
    await CAT.destroy({ where: { c_catid: catid } });
    return res.send({ result: "정상적으로 삭제되었습니다." });
  } catch (err) {
    console.error(err);
    return res.send({ error: "DELETE 실행 중 문제가 발생했습니다." });
  }
});

// 특정 category 내에서 subject INSERT 시 해당 category 정보 SELECT
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

// 특정 category 내에서 모든 subject SELECT
router.get("/cat/:catid", async (req, res, next) => {
  const catid = req.params.catid;

  try {
    const category = await CAT.findAll({
      raw: true,
      where: { c_catid: catid },
      include: [
        {
          model: SUB,
          as: "tbl_subjects",
          attributes: [
            [sequelize.fn("count", Sequelize.col("s_subid")), "length"],
          ],
          order: [
            ["s_date", "DESC"],
            ["s_time", "DESC"],
          ],
        },
      ],
      group: ["tbl_categories.c_catid"],
    });

    const subList = await SUB.findAll({
      raw: true,
      order: [["s_subject", "ASC"]],
      attributes: [
        "s_subid",
        "s_subject",
        "s_catid",
        "s_bookmark",
        [sequelize.fn("count", Sequelize.col("k_keyid")), "length"],
      ],
      where: { s_catid: catid },
      include: [
        {
          model: KEY,
          as: "tbl_keywords",
        },
      ],
      group: ["tbl_subjects.s_subid"],
    });
    return res.send({ category, subList });
  } catch (error) {
    console.error(error);
    return res.send({ error: "SQL query 실행 중 문제가 발생했습니다." });
  }
});

// subject search
// ** item 클릭 후 뒤로 가기 하면 화면이 초기화
// input 값을 지우면 원래 목록으로 되돌아가지 않음
router.post("/sub/search", async (req, res) => {
  const value = req.body.value;
  const catid = req.body.catid;
  try {
    const result = await DB.sequelize.query(
      `SELECT s_subid, s_subject, s_catid, s_bookmark, COUNT(tbl_keywords.k_keyid) AS length 
      FROM tbl_subjects INNER JOIN tbl_keywords ON s_subid = k_subid 
      WHERE s_catid = "${catid}" AND (
        s_subject LIKE "%${value}%" 
        OR s_content LIKE "%${value}%" 
        OR tbl_keywords.k_keyword LIKE "%${value}%"
        ) 
      GROUP BY s_subid ORDER BY s_subject`,
      {
        type: QueryTypes.SELECT,
      }
    );

    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.send({ error: "SQL query 실행 중 문제가 발생했습니다." });
  }
});

// subject bookmark toggle
router.put("/sub/bookmark/:subid", async (req, res) => {
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

// subject INSERT
router.post("/sub/insert", fileUp.array("attach"), async (req, res, next) => {
  try {
    console.log(req.body);
    const subjects = req.body.subjects;
    const keywords = req.body.keywords;
    const files = req?.body?.files;
    console.log(files);

    const uploadFiles = (sub, file) => {
      const uploadFileInfo = {
        a_attid: v4().substring(0, 8),
        a_subid: sub.s_subid,
        a_date: moment().format("YYYY[-]MM[-]DD"),
        a_time: moment().format("HH:mm:ss"),
        a_original_name: file.a_original_name,
        a_save_name: file.filename,
        a_ext: file.a_ext,
      };
      return uploadFileInfo;
    };

    const subResult = await SUB.create(subjects);
    const filesInfo = files.map((file) => {
      return uploadFiles(subResult, file);
    });
    await ATT.bulkCreate(filesInfo);
    await KEY.bulkCreate(keywords);
    return res.send({ result: "정상적으로 추가되었습니다." });
  } catch (error) {
    console.error(error);
    return res.send({ error: "SQL query 실행 중 문제가 발생했습니다." });
  }
});

// subject 상세 정보
router.get("/sub/:subid", async (req, res, next) => {
  const subid = req.params.subid;

  try {
    const subject = await SUB.findAll({
      raw: true,
      where: { s_subid: subid },
      include: [
        {
          model: KEY,
          as: "tbl_keywords",
          attributes: [
            [sequelize.fn("count", Sequelize.col("k_keyid")), "length"],
          ],
        },
      ],
      group: ["tbl_subjects.s_subid"],
    });
    console.log(subject);
    const keywords = await KEY.findAll({
      where: { k_subid: subid },
    });
    return res.send({ subject, keywords });
  } catch (error) {
    console.error(error);
    return res.send({ error: "SQL query 실행 중 문제가 발생했습니다." });
  }
});

// subject UPDATE
router.put("/sub/update", async (req, res, next) => {
  try {
    const subjects = req.body.subjects;
    let keywords = req.body.keywords;
    // 배열로 받은 keywords 를 각 객체로 생성
    // ** 순서대로 저장?
    keywords = keywords.map((keyword) => {
      return {
        k_keyid: v4().substring(0, 8),
        k_subid: subjects.s_subid,
        k_keyword: keyword,
      };
    });
    await SUB.update(subjects, { where: { s_subid: subjects.s_subid } });
    await KEY.destroy({ where: { k_subid: subjects.s_subid } });
    await KEY.bulkCreate(keywords);
    return res.send({ result: "정상적으로 수정되었습니다." });
  } catch (error) {
    console.error(error);
    return res.send({ error: "SQL query 실행 중 문제가 발생했습니다." });
  }
});

router.delete("/sub/delete/:subid", async (req, res, next) => {
  try {
    const subid = req.params.subid;
    await SUB.destroy({ where: { s_subid: subid } });
    return res.send({ result: "정상적으로 삭제되었습니다." });
  } catch (error) {
    console.error(error);
    return res.send({ error: "SQL query 실행 중 문제가 발생했습니다." });
  }
});

export default router;
