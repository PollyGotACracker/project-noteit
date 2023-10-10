import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const getToken = async (req, res, next) => {
  try {
    const email = req?.payload?.email || req?.body?.u_userid;
    const payload = { email: email };
    const privateKey = process.env.JWT_ACCESS_SECRET;
    const accessToken = jwt.sign(payload, privateKey, {
      expiresIn: "1h",
      issuer: "noteit",
    });
    res.setHeader("Authorization", `Bearer ${accessToken}`);
    return next();
  } catch {
    return res
      .status(400)
      .json({ code: 400, error: "토큰 데이터가 없습니다." });
  }
};

export const getRefresh = async (req, res, next) => {
  try {
    const email = req?.payload?.email || req?.body?.u_userid;
    const payload = { email: email };
    const privateKey = process.env.JWT_REFRESH_SECRET;
    const refreshToken = jwt.sign(payload, privateKey, {
      expiresIn: "24h",
      issuer: "noteit",
    });
    const maxAge = 24 * 60 * 60 * 1000;
    res.cookie("refreshToken", refreshToken, {
      maxAge,
      httpOnly: true,
      sameSite: "Strict",
      // secure: true,
      // domain: "",
    });
    return next();
  } catch {
    return res
      .status(400)
      .json({ code: 400, error: "토큰 데이터가 없습니다." });
  }
};

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.substring(7);
    const privateKey = process.env.JWT_ACCESS_SECRET;
    req.payload = jwt.verify(token, privateKey);
    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        code: "INVALID_ACCESS_TOKEN",
        message: "토큰이 만료되었습니다.\n다시 시도해주세요.",
      });
    } else {
      return res.status(401).json({
        code: "UNKNOWN_ACCESS_TOKEN",
        message: "토큰이 만료되었습니다.\n다시 시도해주세요.",
      });
    }
  }
};

export const verifyRefresh = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    const privateKey = process.env.JWT_REFRESH_SECRET;
    req.payload = jwt.verify(token, privateKey);
    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        code: "INVALID_REFRESH_TOKEN",
        message: "장기간 미활동으로 로그아웃되었습니다.\n다시 로그인해주세요.",
      });
    }
    if (req.headers["x-initial-entry"] === "true") {
      return res.status(200).json({ code: "INITIAL_ENTRY" });
    } else {
      return res.status(401).json({
        code: "UNKNOWN_REFRESH_TOKEN",
        message: "로그인이 필요합니다.",
      });
    }
  }
};
