/**
 * express generator ES6+ Template
 * @author : callor@callor.com
 * @since : 2020-12-10
 * @update : 2022-11-01
 * @see : nodejs + express 프로젝트에서 ES6+ 문법을 사용하기 위한 template
 */

// essential modules
import express from "express";
import createError from "http-errors";
import path from "path";

// 3rd party lib modules
import cookieParser from "cookie-parser";
import logger from "morgan";

// MySQL Sequelize
import DB from "../models/index.js";

// sample router modules
import dashboardRouter from "../routes/dashboard.js";
import noteRouter from "../routes/note.js";
import quizRouter from "../routes/quiz.js";
import searchRouter from "../routes/search.js";
import todoRouter from "../routes/todo.js";
import userRouter from "../routes/user.js";

// scheduler
import { scheduleJob } from "node-schedule";
import { removeAttach } from "../modules/remove_attach.js";

// create express framework
const app = express();

DB.sequelize.sync({ force: false }).then((dbConn) => {
  console.log(dbConn.options.host, dbConn.config.database, "DB Connection OK");
});

// Disable the fingerprinting of this web technology.
app.disable("x-powered-by");

app.set("views", path.join("react-client/build"));

// middleWare enable
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join("react-client/build")));
app.use("/uploads", express.static(path.join("public/uploads")));

// router link enable
app.use("/dashboard", dashboardRouter);
app.use("/note", noteRouter);
app.use("/quiz", quizRouter);
app.use("/search", searchRouter);
app.use("/todo", todoRouter);
app.use("/user", userRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// execute scheduler
app.listen(process.env.PORT, () => {
  /**
   * 게시되지 않은 첨부파일 완전 삭제(modules/attach_remove.js)
   * 서버가 켜져 있을 때 매일 자정에 실행 : 0 0 0 * * *
   */
  // 테스트용 5초마다 실행 : */5 * * * * *
  scheduleJob("0 0 0 * * *", async () => {
    await removeAttach();
  });
});

export default app;
