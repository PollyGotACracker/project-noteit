import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const getToken = (email) => {
  const payload = { email: email };
  const privateKey = process.env.JWT_SECRET;
  const token = jwt.sign(payload, privateKey, {
    expiresIn: "1h",
    issuer: "noteit",
  });
  return token;
};

export const verifyToken = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    const token = authorization.substring(7);
    const privateKey = process.env.JWT_SECRET;
    req.payload = jwt.verify(token, privateKey);
    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(419).json({
        code: 419,
        message: "토큰이 만료되었습니다.\n다시 로그인해주세요.",
      });
    } else {
      return res
        .status(401)
        .json({ code: 401, error: "유효하지 않은 토큰입니다." });
    }
  }
};
