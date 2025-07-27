import joi from "joi";

export const registerSchema = joi.object({
  userName: joi.string().required(),
  email: joi.string().email().required(),
  password: joi
    .string()
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
});
export const logInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi
    .string()
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
});
export const confirmOtpSchema = joi.object({
  code: joi.string().length(5).required(),
});
export const newPasswordSchema = joi.object({
  newPassword: joi
    .string()
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
});
