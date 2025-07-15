import { Router } from "express";
import auth from "./auth.js";
import bookmark from "./bookmark.js";

const router = Router();

router.use("/auth", auth);
router.use("/bookmarks", bookmark);

export default router;
