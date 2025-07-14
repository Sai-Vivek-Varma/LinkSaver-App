import { Router } from "express";
import { register, login, userDetails } from "../controllers/authController.js";
import { isAuthenticated } from "../middleware/auth.js";

const app = Router();

app.post("/register", register);
app.post("/login", login);

app.get("/me", isAuthenticated, userDetails);

export default app;
