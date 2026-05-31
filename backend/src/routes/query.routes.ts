import express from "express";
import { askQuestion } from "../controllers/query.controller";

const router = express.Router();

router.post(
  "/ask",
  askQuestion
);

export default router;