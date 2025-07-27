import bcrypt from "bcrypt";

export const comparePass = async ({key, hashed}) => {
  return bcrypt.compareSync(key, hashed);
};
