import express from "express";
import { v4 as uuid } from "uuid";
import moment from "moment";
import fileUp from "../modules/file_upload.js";
import { sanitizer } from "../modules/sanitize_html.js";
import DB from "../models/index.js";
const CAT = DB.models.tbl_categories;
const SUB = DB.models.tbl_subjects;
const KEY = DB.models.tbl_keywords;
const ATT = DB.models.tbl_attachs;
const SCO = DB.models.tbl_score;
const router = express.Router();

// SELECT all categories
router.get("/cats/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const catList = await CAT.findAll({
      raw: true,
      order: [
        ["c_bookmark", "DESC"],
        ["c_category", "ASC"],
        ["c_date", "DESC"],
      ],
      where: { c_userid: userId },
    });
    return res.json(catList);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "노트 목록을 불러오는 중 문제가 발생했습니다.",
    });
  }
});

// SELECT category detail (when SELECT/UPDATE subject, keywords)
router.get("/cat/detail/:catid", async (req, res) => {
  try {
    const catid = req.params.catid;
    const category = await CAT.findAll({
      attributes: ["c_catid", "c_category"],
      where: { c_catid: catid },
    });
    return res.json(category[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "노트 데이터를 불러오는 중 오류가 발생했습니다.",
    });
  }
});

// INSERT category
router.post("/cat/insert", async (req, res) => {
  try {
    const _data = req.body;
    const data = {
      ..._data,
      c_catid: uuid().substring(0, 8),
      c_date: moment().format("YYYY[-]MM[-]DD"),
    };
    await CAT.create(data);
    return res.json({ message: "노트가 정상적으로 등록되었습니다." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "중복되는 노트 이름이 있는지 다시 확인해주세요.",
    });
  }
});

// UPDATE category
router.patch("/cat/update", async (req, res) => {
  try {
    const { c_catid: catid, c_category: category } = req.body;
    await CAT.update({ c_category: category }, { where: { c_catid: catid } });
    await SUB?.update({ s_category: category }, { where: { s_catid: catid } });
    await SCO?.update(
      { sc_category: category },
      { where: { sc_catid: catid } }
    );
    return res.json({ message: "노트가 정상적으로 수정되었습니다." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "노트를 수정하는 중 문제가 발생했습니다.",
    });
  }
});

// toggle category bookmark
router.patch("/cat/bookmark", async (req, res) => {
  try {
    const { c_catid, c_bookmark } = req.body;
    await CAT.update({ c_bookmark }, { where: { c_catid } });
    const message =
      c_bookmark === 1 ? "북마크 되었습니다." : "북마크가 해제되었습니다.";
    return res.json({ message: message, result: c_bookmark });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "노트 북마크 업데이트 중 오류가 발생했습니다.",
    });
  }
});

// DELETE category
router.delete("/cat/:catid/delete", async (req, res) => {
  try {
    const catid = req.params.catid;
    const _sub = await SUB.findAll({
      raw: true,
      where: { s_catid: catid },
    })[0];
    const subid = _sub?.s_subid || "";

    await KEY.destroy({ where: { k_subid: subid } });
    await SUB.destroy({ where: { s_subid: subid } });
    await CAT.destroy({ where: { c_catid: catid } });
    return res.json({ message: "노트가 정상적으로 삭제되었습니다." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "노트 삭제 중 오류가 발생했습니다.",
    });
  }
});

// SELECT all subjects (in specific category)
router.get("/subs/:catid", async (req, res) => {
  try {
    const catid = req.params.catid;
    const category = await CAT.findAll({
      raw: true,
      where: { c_catid: catid },
    });
    const subjects = await SUB.findAll({
      raw: true,
      order: [
        ["s_bookmark", "DESC"],
        ["s_subject", "ASC"],
      ],
      where: { s_catid: catid },
    });
    return res.json({ category: category[0], subjects });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "주제 목록을 불러오는 중 오류가 발생했습니다." });
  }
});

// SELECT subject detail
router.get("/sub/detail/:subid", async (req, res) => {
  try {
    const subid = req.params.subid;
    const subject = await SUB.findAll({
      where: { s_subid: subid },
    });
    const keywords = await KEY.findAll({
      where: { k_subid: subid },
      order: [["k_index", "ASC"]],
    });
    return res.json({ subject: subject[0], keywords });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "주제 상세 내용을 표시하는 중 오류가 발생했습니다.",
    });
  }
});

// toggle subject bookmark
router.patch("/sub/bookmark", async (req, res) => {
  try {
    const { s_subid, s_bookmark } = req.body;
    await SUB.update({ s_bookmark }, { where: { s_subid } });
    const message =
      s_bookmark === 1 ? "북마크 추가되었습니다." : "북마크 해제되었습니다.";
    return res.json({ message, result: s_bookmark });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "주제 북마크 업데이트 중 오류가 발생했습니다.",
    });
  }
});

// INSERT attach
router.post("/upload", fileUp.single("upload"), async (req, res) => {
  try {
    const file = req.file;
    const uploadFileInfo = {
      a_attid: uuid().substring(0, 8),
      a_subid: req.body.subid,
      a_date: moment().format("YYYY[-]MM[-]DD"),
      a_time: moment().format("HH:mm:ss"),
      a_originalname: file.originalname,
      a_savename: file.filename,
      a_ext: file.mimetype,
    };
    await ATT.create(uploadFileInfo);
    return res.json({
      uploaded: true,
      url: uploadFileInfo.a_savename,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "이미지 업로드 중 예기치 않은 오류가 발생했습니다." });
  }
});

// INSERT subject
router.post("/sub/insert", sanitizer, async (req, res) => {
  try {
    const subid = uuid().substring(0, 8);
    const keywords = req.body?.keywords;
    keywords?.map((key, idx) => {
      key.k_subid = subid;
      key.k_index = idx + 1;
    });
    const subjects = {
      ...req.body.subjects,
      s_keycount: keywords.length,
      s_content: req.filtered,
      s_subid: subid,
      s_date: moment().format("YYYY[-]MM[-]DD"),
    };

    await SUB.create(subjects);
    await KEY.bulkCreate(keywords);
    await CAT.increment("c_subcount", {
      by: 1,
      where: { c_catid: subjects.s_catid },
    });
    return res.json({
      message: "주제가 정상적으로 추가되었습니다.",
      subId: subid,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "주제 추가 중 문제가 발생했습니다." });
  }
});

// UPDATE subject
router.patch("/sub/update", sanitizer, async (req, res) => {
  try {
    const subid = req.body.subjects.s_subid;
    const keywords = req.body?.keywords;
    keywords?.map((key, idx) => {
      key.k_subid = subid;
      key.k_index = idx + 1;
    });
    const subjects = {
      ...req.body.subjects,
      s_keycount: keywords.length,
      s_content: req.filtered,
    };
    await SUB.update(subjects, { where: { s_subid: subjects.s_subid } });
    await KEY.destroy({ where: { k_subid: subjects.s_subid } });
    await KEY.bulkCreate(keywords);
    return res.json({
      message: "주제가 정상적으로 수정되었습니다.",
      subId: subid,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "주제 수정 중 문제가 발생했습니다." });
  }
});

// DELETE subject
router.delete("/sub/:catid/:subid/delete", async (req, res) => {
  try {
    const catid = req.params.catid;
    const subid = req.params.subid;
    await KEY.destroy({ where: { k_subid: subid } });
    await SUB.destroy({ where: { s_subid: subid } });
    await CAT.decrement("c_subcount", {
      by: 1,
      where: { c_catid: catid },
    });
    return res.json({ message: "주제가 정상적으로 삭제되었습니다." });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "주제 삭제 중 오류가 발생했습니다." });
  }
});

export default router;
