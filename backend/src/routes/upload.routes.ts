import express from "express";
import multer from "multer";

import { uploadFile } from "../controllers/upload.controller";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "./src/uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/upload",
  upload.single("document"),
  uploadFile
);

export default router;