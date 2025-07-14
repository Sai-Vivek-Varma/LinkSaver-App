import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { connectDB } from "./config/db.js";
import routes from "./routes/index.js";
import { responseHandler } from "./utils/responseHandler.js";
import { errorMiddleware } from "./middleware/error.js";

config();

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(responseHandler);

connectDB();

//routes
app.use("/api/v1", routes);

app.get("/", (req, res) => {
  res.send("Server working");
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Listening on port : ${PORT}`);
});
