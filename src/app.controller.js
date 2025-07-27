import { createHandler } from "graphql-http/lib/use/express";
import { connectDB } from "./DB/connectionDB.js";
import { schema } from "./DB/models/graphql.model.js";
import { authentication } from "./middleware/auth.js";

const bootstrap = async (app, express) => {
  app.use(express.json());

  await connectDB();

  app.use(
    "/graphql",
    createHandler({
      schema: schema,
      context: async (req, res) => {
        const authHeader = req.headers.authorization || "";
        if (!authHeader) {
          return { user: null };
        }
        if (authHeader.startsWith("Bearer ")) {
          const token = authHeader.split(" ")[1];
          try {
            const user = await authentication({ authorization: token });
            return { user }; // ← ده بيوصل لكل الـ resolvers
          } catch (err) {
            return { user: null };
          }
        }
        return {}; // ← بدون يوزر
      },
    })
  );

  app.use((req, res, next) => {
    return res.status(404).json({ msg: `invalid url ${req.originalUrl} ` });
  });
};

export default bootstrap;
