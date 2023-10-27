import express from "express";
import { Op, Sequelize } from "sequelize";
import { v4 as uuid } from "uuid";
import moment from "moment";
import { verifyToken } from "../modules/user_token.js";
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
router.get("/cats", verifyToken, async (req, res, next) => {
  try {
    const userid = req.payload.email;
    const limit = Number(req.query.limit);
    const offset = Number(req.query.offset);
    const filter = req.query.filter === "true" ? true : false;
    const filterQueries = [{ c_userid: userid }];
    if (filter) filterQueries.push({ c_bookmark: 1 });

    const data = await CAT.findAll({
      raw: true,
      order: [
        ["c_date", "DESC"],
        ["c_category", "ASC"],
      ],
      where: { [Op.and]: filterQueries },
      limit: limit,
      offset: offset,
    });
    const currentPage = Math.ceil((offset + 1) / limit);
    const _totalData = await CAT.count({
      where: { c_userid: userid },
    });
    const totalPages = Math.ceil(_totalData / limit);
    return res.json({ data, offset, limit, currentPage, totalPages });
  } catch (err) {
    return next(err);
  }
});

// SELECT category info (when SELECT/UPDATE subject, keywords)
router.get("/cat/info/:catid", verifyToken, async (req, res, next) => {
  try {
    const userid = req.payload.email;
    const catid = req.params.catid;
    const category = await CAT.findAll({
      where: {
        [Op.and]: [{ c_catid: catid }, { c_userid: userid }],
      },
    });
    return res.json(category[0]);
  } catch (err) {
    return next(err);
  }
});

// INSERT category
router.post("/cat/insert", verifyToken, async (req, res, next) => {
  try {
    const userid = req.payload.email;
    const _data = req.body;
    const data = {
      ..._data,
      c_catid: uuid().substring(0, 8),
      c_userid: userid,
      c_date: moment().format("YYYY[-]MM[-]DD"),
    };
    await CAT.create(data);
    return res.json({
      message: "노트가 정상적으로 등록되었습니다.",
    });
  } catch (err) {
    if (err instanceof Sequelize.UniqueConstraintError) {
      err.errors.forEach((errorItem) => {
        if (errorItem.path === "c_category") {
          return res.status(422).json({
            message: "중복되는 노트 이름이 있는지 다시 확인해주세요.",
          });
        }
      });
    } else return next(err);
  }
});

// UPDATE category
router.patch("/cat/update", verifyToken, async (req, res, next) => {
  try {
    const userid = req.payload.email;
    const { c_catid: catid, c_category: category } = req.body;

    await DB.sequelize.transaction(async () => {
      await CAT.update(
        { c_category: category },
        { where: { [Op.and]: [{ c_catid: catid }, { c_userid: userid }] } }
      );
      await SUB?.update(
        { s_category: category },
        { where: { [Op.and]: [{ s_catid: catid }, { s_userid: userid }] } }
      );
      await SCO?.update(
        { sc_category: category },
        { where: { [Op.and]: [{ sc_catid: catid }, { sc_userid: userid }] } }
      );
    });
    return res.json({
      message: "노트가 정상적으로 수정되었습니다.",
    });
  } catch (err) {
    if (err instanceof Sequelize.UniqueConstraintError) {
      err.errors.forEach((errorItem) => {
        if (errorItem.path === "c_category") {
          return res.status(422).json({
            message: "중복되는 노트 이름이 있는지 다시 확인해주세요.",
          });
        }
      });
    } else {
      return next(err);
    }
  }
});

// toggle category bookmark
router.patch("/cat/bookmark", verifyToken, async (req, res, next) => {
  try {
    const userid = req.payload.email;
    const { c_catid, c_bookmark } = req.body;
    await CAT.update(
      { c_bookmark },
      { where: { [Op.and]: [{ c_catid }, { c_userid: userid }] } }
    );
    const message =
      c_bookmark === 1 ? "북마크 되었습니다." : "북마크가 해제되었습니다.";
    return res.json({ message: message, result: c_bookmark });
  } catch (err) {
    return next(err);
  }
});

// DELETE category
router.delete("/cat/:catid/delete", verifyToken, async (req, res, next) => {
  try {
    const userid = req.payload.email;
    const catid = req.params.catid;
    const _sub = await SUB.findAll({
      raw: true,
      where: { s_catid: catid },
    })[0];
    const subid = _sub?.s_subid || "";

    await DB.sequelize.transaction(async () => {
      await KEY.destroy({
        where: {
          [Op.and]: [{ k_subid: subid }, { k_userid: userid }],
        },
      });
      await SUB.destroy({
        where: {
          [Op.and]: [{ s_subid: subid }, { s_userid: userid }],
        },
      });
      await CAT.destroy({
        where: { [Op.and]: [{ c_catid: catid }, { c_userid: userid }] },
      });
    });
    return res.json({
      message: "노트가 정상적으로 삭제되었습니다.",
    });
  } catch (err) {
    return next(err);
  }
});

// SELECT all subjects (in specific category)
router.get("/subs/:catid", verifyToken, async (req, res, next) => {
  try {
    const limit = Number(req.query.limit);
    const offset = Number(req.query.offset);
    const userid = req.payload.email;
    const catid = req.params.catid;

    const category = await CAT.findAll({
      raw: true,
      where: { [Op.and]: [{ c_catid: catid }, { c_userid: userid }] },
    });
    const data = await SUB.findAll({
      raw: true,
      order: [
        ["s_date", "DESC"],
        ["s_subject", "ASC"],
        ["s_bookmark", "DESC"],
      ],
      where: {
        [Op.and]: [{ s_catid: catid }, { s_userid: userid }],
      },
      limit: limit,
      offset: offset,
    });
    const currentPage = Math.ceil((offset + 1) / limit);
    const _totalData = await category[0].c_subcount;
    const totalPages = Math.ceil(_totalData / limit);
    return res.json({
      data,
      offset,
      limit,
      currentPage,
      totalPages,
    });
  } catch (err) {
    return next(err);
  }
});

// SELECT subject detail
router.get("/sub/detail/:subid", verifyToken, async (req, res, next) => {
  try {
    const userid = req.payload.email;
    const subid = req.params.subid;
    const subject = await SUB.findAll({
      where: { [Op.and]: [{ s_subid: subid }, { s_userid: userid }] },
    });
    const keywords = await KEY.findAll({
      where: {
        [Op.and]: [{ k_subid: subid }, { k_userid: userid }],
      },
      order: [["k_index", "ASC"]],
    });
    return res.json({ subject: subject[0], keywords });
  } catch (err) {
    return next(err);
  }
});

// toggle subject bookmark
router.patch("/sub/bookmark", verifyToken, async (req, res, next) => {
  try {
    const userid = req.payload.email;
    const { s_subid, s_bookmark } = req.body;
    await SUB.update(
      { s_bookmark },
      {
        where: {
          [Op.and]: [{ s_subid }, { s_userid: userid }],
        },
      }
    );
    const message =
      s_bookmark === 1 ? "북마크 추가되었습니다." : "북마크 해제되었습니다.";
    return res.json({ message, result: s_bookmark });
  } catch (err) {
    return next(err);
  }
});

// INSERT attach
router.post(
  "/upload",
  verifyToken,
  fileUp.single("upload"),
  async (req, res, next) => {
    try {
      const userid = req.payload.email;
      const file = req.file;
      const uploadFileInfo = {
        a_attid: uuid().substring(0, 8),
        a_userid: userid,
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
      return next(err);
    }
  }
);

// INSERT subject
router.post("/sub/insert", verifyToken, sanitizer, async (req, res, next) => {
  try {
    const userid = req.payload.email;
    const subid = uuid().substring(0, 8);
    const keywords = req.body?.keywords;

    keywords?.map((key, idx) => {
      key.k_userid = userid;
      key.k_subid = subid;
      key.k_index = idx + 1;
    });
    const subjects = {
      ...req.body.subjects,
      s_userid: userid,
      s_keycount: keywords.length,
      s_content: req.filtered,
      s_subid: subid,
      s_date: moment().format("YYYY[-]MM[-]DD"),
    };

    await DB.sequelize.transaction(async () => {
      await SUB.create(subjects);
      await KEY.bulkCreate(keywords);
      await CAT.increment("c_subcount", {
        by: 1,
        where: {
          [Op.and]: [{ c_catid: subjects.s_catid }, { c_userid: userid }],
        },
      });
    });
    return res.json({
      message: "주제가 정상적으로 추가되었습니다.",
      subId: subid,
    });
  } catch (err) {
    return next(err);
  }
});

// UPDATE subject
router.patch("/sub/update", verifyToken, sanitizer, async (req, res, next) => {
  try {
    const userid = req.payload.email;
    const subid = req.body.subjects.s_subid;
    const keywords = req.body?.keywords;

    keywords?.map((key, idx) => {
      key.k_userid = userid;
      key.k_subid = subid;
      key.k_index = idx + 1;
    });
    const subjects = {
      ...req.body.subjects,
      s_keycount: keywords.length,
      s_content: req.filtered,
    };

    await DB.sequelize.transaction(async () => {
      await SUB.update(subjects, {
        where: {
          [Op.and]: [{ s_subid: subjects.s_subid }, { s_userid: userid }],
        },
      });
      await KEY.destroy({
        where: {
          [Op.and]: [{ k_subid: subjects.s_subid }, { k_userid: userid }],
        },
      });
      await KEY.bulkCreate(keywords);
    });
    return res.json({
      message: "주제가 정상적으로 수정되었습니다.",
      subId: subid,
    });
  } catch (err) {
    return next(err);
  }
});

// DELETE subject
router.delete(
  "/sub/:catid/:subid/delete",
  verifyToken,
  async (req, res, next) => {
    try {
      const userid = req.payload.email;
      const catid = req.params.catid;
      const subid = req.params.subid;

      await DB.sequelize.transaction(async () => {
        await KEY.destroy({
          where: { [Op.and]: [{ k_subid: subid }, { k_userid: userid }] },
        });
        await SUB.destroy({
          where: { [Op.and]: [{ s_subid: subid }, { s_userid: userid }] },
        });
        await CAT.decrement("c_subcount", {
          by: 1,
          where: { [Op.and]: [{ c_catid: catid }, { c_userid: userid }] },
        });
      });
      return res.json({
        message: "주제가 정상적으로 삭제되었습니다.",
      });
    } catch (err) {
      return next(err);
    }
  }
);

export default router;
