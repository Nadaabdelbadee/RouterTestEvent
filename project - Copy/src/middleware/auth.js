import userModel from "../DB/models/users.model.js";
import { verify } from "../utlis/verify.js";

export const authentication = async ({ authorization }) => {
  const token = authorization;
  if (!token) {
    throw new Error("token not found", { cause: 400 });
  }
  let SIGNATURE = process.env.SIGNATURE;

  const decoded = await verify({
    token,
    SIGNATURE,
  });

  if (!decoded?.id) {
    throw new Error("invalid token payload", { cause: 400 });
  }
  const user = await userModel.findById(decoded.id);
  if (!user) {
    throw new Error("user not found", { cause: 401 });
  }
  if (parseInt(user?.changePasswordAT?.getTime() / 1000) >= decoded.iat) {
    return next(new Error("expired Token", { cause: 401 }));
  }

  if (user.isDeleted) {
    throw new Error("user deleted", { cause: 401 });
  }
  return user;
};
