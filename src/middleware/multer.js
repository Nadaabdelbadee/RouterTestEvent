import multer from "multer";
import { Router } from "express";
import fs from "fs";
import { authentication } from "./auth.js";
import path from "path";

const router = Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "./uploads";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const originalName = file.originalname;
    const finalPath = path.join("./uploads", originalName);

    if (fs.existsSync(finalPath)) {
      fs.unlinkSync(finalPath);
    }

    cb(null, originalName);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/upload",
  async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token not found" });
    }

    const token = authHeader.split(" ")[1];
    try {
      const user = await authentication({ authorization: token });
      req.user = user;
      next();
    } catch (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
  },
  upload.single("image"),
  (req, res) => {
    const filePath = `/uploads/${req.file.filename}`;
    res.json({ imageUrl: filePath });
  }
);

export default router;
