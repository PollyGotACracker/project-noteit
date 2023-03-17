import express from "express";
import DB from "../models/index.js";
import moment from "moment";
const TODO = DB.models.tbl_todo;
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    return next();
  } catch (error) {
    console.error(error);
    return res.json({ error: "SELECT 오류" });
  }
});

router.post("/insert", async (req, res, next) => {
  const data = req.body;
  try {
    await TODO.create(data);
    return next();
  } catch (error) {
    console.error(error);
    return res.json({ error: "서버 오류" });
  }
});
router.put("/update", async (req, res, next) => {
  const data = req.body;
  try {
    await TODO.update(data, { where: { t_todoid: data.t_todoid } });
    return next();
  } catch (error) {
    console.error(error);
    return res.json({ error: "서버 오류" });
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    await TODO.destroy({ where: { t_todoid: id } });
    return next();
  } catch (error) {
    console.error(error);
    return res.json({ error: "DELETE 오류" });
  }
});

router.put("/complete/:id", async (req, res, next) => {
  const id = req.params.id;
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
      { where: { t_todoid: id } }
    );
    return next();
  } catch (error) {
    console.error(error);
    return res.json({ error: "업데이트 오류" });
  }
});

router.all("/**", async (req, res) => {
  try {
    const list = await TODO.findAll({
      order: [
        ["t_deadline", "DESC"],
        ["t_prior", "ASC"],
        ["t_date", "DESC"],
      ],
    });

    return res.json(list);
  } catch (error) {
    console.error;
    return res.json({ error: "Todo SELECT 오류" });
  }
});

export default router;
