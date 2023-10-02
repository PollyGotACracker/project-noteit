import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashed = await bcrypt.hash(password, saltRounds);
  return hashed;
};

export const checkPassword = async (password, hashed) => {
  const result = await bcrypt.compare(password, hashed);
  return result;
};
