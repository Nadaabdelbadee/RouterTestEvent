import bcrypt from "bcrypt";

export const Hash = ({ key, saltRounds = process.env.SALT }) => {
  return bcrypt.hashSync(key, Number(saltRounds));
};
