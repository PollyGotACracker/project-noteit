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
import session from "express-session";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import logger from "../modules/logger.js";
import { fileURLToPath } from "url";

// MySQL Sequelize
import DB from "../models/index.js";

// router modules
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
app.enable("trust proxy", true);

dotenv.config();

DB.sequelize.sync({ force: false }).then((dbConn) => {
  console.log(dbConn.options.host, dbConn.config.database, "DB Connection OK");
});

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(hpp());
} else {
  app.use(morgan("dev"));
}

const __dirname = fileURLToPath(new URL(".", import.meta.url));
// const __filename = fileURLToPath(import.meta.url);

// disable the fingerprinting of this web technology.
app.disable("x-powered-by");

// middleWare enable
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

// cors
const productionOrigin = [`https://${process.env.PRODUCTION_DOMAIN}`];
const developmentOrigin = [`http://localhost:5173`, `http://127.0.0.1:5173`];
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? productionOrigin
        : developmentOrigin,
    credentials: true,
    methods: "GET,PUT,POST,PATCH,DELETE,OPTIONS",
    allowedHeaders: "X-Initial-Entry",
  })
);

// session enable
const sessionOption = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 5 * 60 * 1000, // 5min
    sameSite: "lax",
    httpOnly: true,
  },
};
if (process.env.NODE_ENV === "production") {
  sessionOption.proxy = true;
  sessionOption.cookie.secure = true;
  sessionOption.cookie.domain = `.${process.env.PRODUCTION_DOMAIN}`;
}
app.use(session(sessionOption));

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
  if (err.status >= 500) logger.error(err);
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "서버 오류가 발생했습니다." });
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
