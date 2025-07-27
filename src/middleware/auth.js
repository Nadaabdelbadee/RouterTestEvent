import userModel from "../DB/models/user.model.js";
import { verify } from "../utlis/verify.js";

export const authentication = async ({ authorization }) => {
  const token = authorization;
  console.log("🚀 Token Received:", authorization);
  if (!token) {
    throw new Error("token not found", { cause: 400 });
  }

  let SIGNATURE = process.env.SIGNATURE;

  const decoded = await verify({
    token,
    SIGNATURE,
  });
console.log(decoded);

  if (!decoded?.id) {
    throw new Error("invalid token payload", { cause: 400 });
  }
  const user = await userModel.findById(decoded.id);
  if (!user) {
    throw new Error("user not found", { cause: 401 });
  }
  console.log(user);
  
  if (parseInt(user?.changePasswordAT?.getTime() / 1000) >= decoded.iat) {
    throw new Error("expired Token", { cause: 401 });
  }

  if (user.isDeleted) {
    throw new Error("user deleted", { cause: 401 });
  }
  return user;
};
