import express from "express";
import dotenv from "dotenv";
import path from "path";
import bootstrap from "./src/app.controller.js";
import router from "./src/middleware/multer.js";
dotenv.config({ path: path.resolve(".env") });
const app = express();
const port = process.env.PORT;

bootstrap(app, express);

app.use('/uploads', express.static('uploads'));
app.use('/api', router);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
