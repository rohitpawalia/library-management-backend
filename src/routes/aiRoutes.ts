import express from "express";
import { recommendBook } from "../controllers/aiController";

const router = express.Router();

router.post("/ai/recommend", recommendBook);

export default router;