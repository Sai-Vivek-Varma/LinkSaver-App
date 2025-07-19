import { Router } from "express";
import {
  createBookmark,
  getBookmarks,
  deleteBookmark,
} from "../controllers/bookmarkController.js";
import { isAuthenticated } from "../middleware/auth.js";

const app = Router();

app.get("/", isAuthenticated, getBookmarks);
app.post("/", isAuthenticated, createBookmark);
app.delete("/:id", isAuthenticated, deleteBookmark);

export default app;
