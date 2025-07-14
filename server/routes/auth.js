import { Router } from "express";
import { register } from "../controllers/authController.js";

const app = Router();

app.post("/register", register);
// app.post("/login");
// app.post("/logout");

export default app;
