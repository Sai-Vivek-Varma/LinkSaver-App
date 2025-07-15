import { Router } from "express";
import {
  createBookmark,
  getBookmarks,
} from "../controllers/bookmarkController.js";
import { isAuthenticated } from "../middleware/auth.js";

const app = Router();

app.get("/", isAuthenticated, getBookmarks);
app.post("/", isAuthenticated, createBookmark);

export default app;
