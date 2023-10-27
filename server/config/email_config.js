import dotenv from "dotenv";

dotenv.config();

export const EMAIL_AUTH = {
  user: process.env.EMAIL_AUTH_USER,
  pass: process.env.EMAIL_AUTH_PASS,
};
