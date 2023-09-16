import express from "express";
import { Op } from "sequelize";
import moment from "moment";
import DB from "../models/index.js";
const TODO = DB.models.tbl_todo;
const router = express.Router();

router.post("/:userid/insert", async (req, res, next) => {
  const data = req.body;
  try {
    await TODO.create(data);
    return next();
  } catch (err) {
    console.log(err);
    return res.send({ error: "Todo 아이템 추가 중 오류가 발생했습니다." });
  }
});

router.patch("/:userid/update", async (req, res, next) => {
  const data = req.body;
  const userid = req.params.userid;
  try {
    await TODO.update(data, {
      where: { [Op.and]: [{ t_todoid: data.t_todoid }, { t_userid: userid }] },
    });
    return next();
  } catch (err) {
    console.log(err);
    return res.send({ error: "Todo 아이템 수정 중 오류가 발생했습니다." });
  }
});

router.delete("/:userid/delete/:id", async (req, res, next) => {
  const id = req.params.id;
  const userid = req.params.userid;
  try {
    await TODO.destroy({
      where: { [Op.and]: [{ t_todoid: id }, { t_userid: userid }] },
    });
    return next();
  } catch (err) {
    console.log(err);
    return res.send({ error: "Todo 아이템 삭제 중 오류가 발생했습니다." });
  }
});

router.patch("/:userid/complete/:id", async (req, res, next) => {
  const id = req.params.id;
  const userid = req.params.userid;
  try {
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
    return res.send({
      error: "Todo 아이템 완료 업데이트 중 오류가 발생했습니다.",
    });
  }
});

router.use("/:userid", async (req, res) => {
  const userid = req.params.userid;
  try {
    const list = await TODO.findAll({
      order: [
        ["t_prior", "ASC"],
        ["t_deadline", "ASC"],
        ["t_date", "DESC"],
        ["t_time", "DESC"],
      ],
      where: { t_userid: userid },
    });
    return res.json(list);
  } catch (err) {
    console.log(err);
    return res.send({ error: "Todo 목록을 불러오는 중 오류가 발생했습니다." });
  }
});

export default router;
