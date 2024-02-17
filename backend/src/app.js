import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true, limit: "50kb" }));

app.use(express.static("public"));

app.use(cookieParser());

// routes
import userRouter from "../src/routes/user.routes.js";

app.use("/api/v1/user", userRouter);

export default app;
