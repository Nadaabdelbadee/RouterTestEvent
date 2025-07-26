import jwt from "jsonwebtoken";

export const verify = async ({ token, signature = process.env.SIGNATURE }) => {
  return jwt.verify(token, signature);
};
