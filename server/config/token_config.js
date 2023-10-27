import dotenv from "dotenv";

dotenv.config();

export const TOKEN_SECRET = {
  access: process.env.JWT_ACCESS_SECRET,
  refresh: process.env.JWT_REFRESH_SECRET,
  reset_pwd: process.env.JWT_RESET_PWD_SECRET,
};
