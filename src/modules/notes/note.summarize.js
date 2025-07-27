import { Router } from "express";
import { summzrizeNote } from "./note.resolve.js";
import { authentication } from "../../middleware/auth.js";

const noteRouter = Router();

noteRouter.post(
  "/note/:id/summarize",
  async (req, res , next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token not found" });
    }

    const token = authHeader.split(" ")[1];
    console.log(token);
    

    try {
      const user = await authentication({ authorization: token });
      console.log(user);
      
      req.user = user;
      next();
    } catch (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
  },
  summzrizeNote
);

export default noteRouter;
