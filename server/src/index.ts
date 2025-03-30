import "dotenv/config";
import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import router from "./router/index";

const app: Express = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(/* {
  credentials: true,
  origin: process.env.CLIENT_URL,
} */));
app.use("/api", router);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    const DB_URL = process.env.DB_URL;
    if (!DB_URL) {
      throw new Error("DB_URL is not defined in environment variables");
    }
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();