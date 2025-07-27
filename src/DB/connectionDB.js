import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(process.env.URL)
    .then(() => {
      console.log("db connected successfully");
    })
    .catch(() => {
      console.log("can't connect to db");
    });
};
