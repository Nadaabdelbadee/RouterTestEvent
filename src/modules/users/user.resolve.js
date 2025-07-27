import userModel from "../../DB/models/user.model.js";
import { comparePass } from "../../utlis/compare.js";
import { eventEmitter } from "../../utlis/eventsendEmail.js";
import { generateToken } from "../../utlis/generateToken.js";
import { Hash } from "../../utlis/hash.js";
// ========================== register ============================

export const register = async (parent, args) => {
  const { userName, email, password } = args;
  if (await userModel.findOne({ email })) {
    throw new Error("user already exist");
  }
  const user = await userModel.create({ userName, email, password });
  return user;
};

// ========================== logIn ============================

export const logIn = async (parent, args) => {
  const { email, password } = args;
  const user = await userModel.findOne({ email, isDeleted: false });
  if (!user) {
    throw new Error("user not exist");
  }
  const compare = await comparePass({ key: password, hashed: user.password });
  if (!compare) {
    throw new Error("Password incorrect");
  }
  const token = await generateToken({
    payload: { email, id: user._id },
    signature: process.env.SIGNATURE,
    option: { expiresIn: "1d" },
  });
  return { token: token };
};

// ========================== logOut ============================

export const logOut = async (parent, args, context) => {
  const email = context?.user?.email;
  if (!email) {
    throw new Error("Unauthorized");
  }
  const user = await userModel.findOne({ email, isDeleted: false });
  if (!user) {
    throw new Error("user not exist , or already deleted");
  }
  const userDeleted = await userModel.updateOne(
    { email: user.email },
    {
      isDeleted: true,
      changePasswordAT: Date.now(),
    }
  );
  return "user Deleted";
};

// ========================== forgetPassword ============================

export const forgetPassword = async (parent, args, context) => {
  const email  = context?.user?.email;
  const user = await userModel.findOne({ email, isDeleted: false });
  if (!user) {
    throw new Error("user not exist");
  }
  eventEmitter.emit("sendEmail", { email });
  return "confirm Email";
};
// ========================== confirmOtp ============================

export const confirmOtp = async (parent, args, context) => {
  const { code } = args;
  const  email  = context?.user?.email;
  const user = await userModel.findOne({ email, confirmed: false });
  if (!user) {
    throw new Error("email not exist or password already reseted", {
      cause: 404,
    });
  }
  if (!(await comparePass({ key: code, hashed: user.otpPassword }))) {
    throw new Error("invalid Code", { cause: 400 });
  }
  const updateUser = await userModel.updateOne({ email }, { confirmed: true });
  return "code confirmed successfully";
};
// ========================== resetPassword ============================

export const resetPassword = async (parent, args, context) => {
  const { newPassword } = args;
  const  email  = context?.user?.email;
  const user = await userModel.findOne({ email, confirmed: true });
  if (!user) {
    throw new Error("email not exist or code not confirmed yet", {
      cause: 404,
    });
  }
  const hash = await Hash({ key: newPassword, saltRounds: process.env.SALT });
  const updateUser = await userModel.findOneAndUpdate(
    { email },
    { password: newPassword, confirmed: false, $unset: { otpPassword: 0 } }
  );
  return updateUser;
};
