import { createHandler } from "graphql-http/lib/use/express";
import { connectDB } from "./DB/connectionDB.js";
import { schema } from "./DB/models/graphql.model.js";

const bootstrap = async (app, express) => {
  app.use(express.json());

  await connectDB();

  app.use("/graphql", createHandler({ schema: schema }));

  app.use((req, res, next) => {
    return res.status(404).json({ msg: `invalid url ${req.originalUrl} ` });
  });
};

export default bootstrap;
