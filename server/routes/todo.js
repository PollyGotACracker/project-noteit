import express from "express";
import { Op } from "sequelize";
import moment from "moment";
import DB from "../models/index.js";
const TODO = DB.models.tbl_todo;
const router = express.Router();

router.post("/:userid/insert", async (req, res, next) => {
  try {
    const data = req.body;
    data.t_date = moment().format("YYYY[-]MM[-]DD");
    data.t_time = moment().format("HH:mm:ss");
    await TODO.create(data);
    return next();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Todo 아이템 추가 중 오류가 발생했습니다." });
  }
});

router.patch("/:userid/update", async (req, res, next) => {
  try {
    const data = req.body;
    const userid = req.params.userid;
    await TODO.update(data, {
      where: { [Op.and]: [{ t_todoid: data.t_todoid }, { t_userid: userid }] },
    });
    return next();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Todo 아이템 수정 중 오류가 발생했습니다." });
  }
});

router.delete("/:userid/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const userid = req.params.userid;
    await TODO.destroy({
      where: { [Op.and]: [{ t_todoid: id }, { t_userid: userid }] },
    });
    return next();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Todo 아이템 삭제 중 오류가 발생했습니다." });
  }
});

router.patch("/:userid/complete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const userid = req.params.userid;
    const todo = await TODO.findByPk(id);
    const date = moment().format("YYYY[-]MM[-]DD");
    const time = moment().format("HH:mm:ss");
    await TODO.update(
      {
        ...todo,
        t_compdate: todo.t_compdate ? "" : date,
        t_comptime: todo.t_comptime ? "" : time,
      },
      { where: { [Op.and]: [{ t_todoid: id }, { t_userid: userid }] } }
    );
    return next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Todo 아이템 완료 업데이트 중 오류가 발생했습니다.",
    });
  }
});

router.use("/:userid", async (req, res) => {
  try {
    const userid = req.params.userid;
    const todos = await TODO.findAll({
      order: [
        ["t_prior", "ASC"],
        ["t_deadline", "ASC"],
        ["t_date", "DESC"],
        ["t_time", "DESC"],
      ],
      where: { t_userid: userid },
    });
    return res.json(todos);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Todo 목록을 불러오는 중 오류가 발생했습니다.",
    });
  }
});

export default router;
