import { EMAIL_AUTH } from "../config/email_config.js";
import { TOKEN_SECRET } from "../config/token_config.js";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

dotenv.config();

const transporterOption = {
  host: "smtp.gmail.com",
  secure: false,
  port: 587,
  auth: EMAIL_AUTH,
};
if (process.env.NODE_ENV === "production") {
  transporterOption.secure = true;
  transporterOption.port = 465;
}
const transporter = nodemailer.createTransport(transporterOption);

export const sendAuthCode = async (req, res, next) => {
  const authCode = Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;
  const email = req.body.email;
  const message = {
    from: `"NoteIT" <${EMAIL_AUTH.user}>`,
    to: email,
    subject: "이메일 인증번호입니다.",
    html: `
    <h1 style="text-align: center; border-bottom: 1px solid black; color: black;">NoteIT</h1>
    <p style="text-align: center; color: black;">아래 인증번호를 5분 내에 입력하세요.</p>
    <p style="text-align: center; letter-spacing: 2px; padding: 10px; background-color: #60798c; border-radius: 10px; color: white; font-size: x-large; font-weight: bold;">${authCode}</p>
    `,
  };
  const info = await transporter.sendMail(message);
  transporter.close();
  if (info.err) {
    return res
      .status(500)
      .json({ code: 500, message: "인증번호 전송에 실패했습니다." });
  }
  req.session.authCode = authCode;
  req.session.save((err) => {
    return res.json({
      message: "인증번호 전송에 성공했습니다.",
    });
  });
};

export const verifyAuthCode = (req, res, next) => {
  const authCode = Number(req.session.authCode);
  const userCode = Number(req.body.code);
  if (!authCode) {
    return res
      .status(422)
      .json({ code: 422, message: "인증번호 유효시간이 만료되었습니다." });
  }
  if (!userCode) {
    return res
      .status(400)
      .json({ code: 400, message: "인증번호를 입력하세요." });
  }
  if (authCode !== userCode) {
    return res
      .status(422)
      .json({ code: 422, message: "인증번호가 일치하지 않습니다." });
  } else {
    return res.json({
      message: "인증에 성공했습니다.",
    });
  }
};

export const sendResetPwdLink = async (req, res, next) => {
  const email = req.body.email;
  const payload = {
    email: email,
    timestamp: Math.floor(Date.now() / 1000) + 60 * 60, // 1h
  };
  const resetToken = jwt.sign(payload, TOKEN_SECRET.reset_pwd, {
    expiresIn: "1h",
    issuer: "noteit",
  });
  const message = {
    from: `"NoteIT" <${EMAIL_AUTH.user}>`,
    to: email,
    subject: "비밀번호 초기화 링크입니다.",
    html: `
    <h1 style="text-align: center; border-bottom: 1px solid black; color: black;">NoteIT</h1>
    <p style="text-align: center; color: black;">1시간 내에 아래 링크로 접속하여 비밀번호를 변경하세요.</p>
    <a href="${
      process.env.NODE_ENV === "production"
        ? `https://${process.env.PRODUCTION_DOMAIN}`
        : "http://localhost:5173"
    }/password-reset/link?verify=${resetToken}" style="text-align: center; display: block; margin: 0 auto; background-color: #60798c; border-radius: 10px; padding: 10px; text-decoration: none; font-size: large; color: white;">비밀번호 변경하기</a>
    `,
  };

  const info = await transporter.sendMail(message);
  transporter.close();
  if (info.err) {
    return res
      .status(500)
      .json({ code: 500, message: "링크 전송에 실패했습니다." });
  }
  return res.json({
    message: "링크 전송에 성공했습니다.",
  });
};

export const verifyResetPwdLink = async (req, res, next) => {
  try {
    const token = req.query.verify;
    req.payload = jwt.verify(token, TOKEN_SECRET.reset_pwd);
    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        code: "INVALID_RESET_TOKEN",
        message: "인증 시간이 만료되었습니다.",
      });
    } else {
      return res.status(401).json({
        code: "UNKNOWN_RESET_TOKEN",
        message: "인증 시간이 만료되었습니다.",
      });
    }
  }
};
