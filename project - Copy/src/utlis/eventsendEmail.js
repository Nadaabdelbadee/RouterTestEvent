import EventEmitter from "events";
import { sendEmail } from "../services/sendEmail.js";
import { nanoid, customAlphabet } from "nanoid";
import { Hash } from "./hash.js";
import userModel from "../DB/models/user.model.js";
export const eventEmitter = new EventEmitter();

eventEmitter.on("sendEmail", async (data) => {
  const { email } = data;
  const otp = customAlphabet("0123456789", 5)();
  const hash = await Hash({ key: otp, saltRounds: process.env.SALT });
  await userModel.updateOne({ email }, { otpPassword: hash });
  await sendEmail(email, "Confirm Otp", otp);
});
