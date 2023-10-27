import express from "express";
import { Op } from "sequelize";
import moment from "moment";
import { verifyToken } from "../modules/user_token.js";
import DB from "../models/index.js";

const TODO = DB.models.tbl_todo;
const router = express.Router();

router.post("/insert", verifyToken, async (req, res, next) => {
  try {
    const data = req.body;
    data.t_date = moment().format("YYYY[-]MM[-]DD");
    data.t_time = moment().format("HH:mm:ss");
    await TODO.create(data);
    return next();
  } catch (err) {
    return next(err);
  }
});

router.patch("/update", verifyToken, async (req, res, next) => {
  try {
    const data = req.body;
    const userid = req.payload.email;
    await TODO.update(data, {
      where: { [Op.and]: [{ t_todoid: data.t_todoid }, { t_userid: userid }] },
    });
    return next();
  } catch (err) {
    return next(err);
  }
});

router.delete("/delete/:id", verifyToken, async (req, res, next) => {
  try {
    const id = req.params.id;
    const userid = req.payload.email;
    await TODO.destroy({
      where: { [Op.and]: [{ t_todoid: id }, { t_userid: userid }] },
    });
    return next();
  } catch (err) {
    return next(err);
  }
});

router.patch("/complete/:id", verifyToken, async (req, res, next) => {
  try {
    const id = req.params.id;
    const userid = req.payload.email;
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
    return next(err);
  }
});

router.use("/", verifyToken, async (req, res, next) => {
  try {
    const userid = req.payload.email;
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
    return next(err);
  }
});

export default router;
