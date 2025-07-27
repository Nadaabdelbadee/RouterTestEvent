import express from "express";
import dotenv from "dotenv";
import path from "path";
import bootstrap from "./src/app.controller.js";
import router from "./src/middleware/multer.js";
import OpenAI from "openai";
import noteRouter from "./src/modules/notes/note.summarize.js";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later.",
});

dotenv.config({ path: path.resolve(".env") });
const app = express();
const port = process.env.PORT;

export const openAI = new OpenAI({
  apiKey: process.env.OPENAIKEY,
});

bootstrap(app, express);
app.use(cors());
app.use(helmet());
app.use(limiter);
app.use("/", noteRouter);
app.use("/uploads", express.static("uploads"));
app.use("/api", router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
