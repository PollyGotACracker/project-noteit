import nodemailer from "nodemailer";
import { EMAIL_AUTH } from "../config/email_config.js";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  //   port: 465,
  //   secure: true,
  port: 587,
  auth: EMAIL_AUTH,
});

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
  return res.json({
    message: "인증번호 전송에 성공했습니다.",
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
