import { mongoose } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  changePasswordAT: Date,
  otpPassword: String,
  confirmed: { type: Boolean, default: false },
  profilePic: { public_id: String, secure_url: String },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const userModel = mongoose.model.User || mongoose.model("User", userSchema);

export default userModel;
