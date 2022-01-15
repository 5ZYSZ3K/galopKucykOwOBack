import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import loginRouter from "./routers/loginRouter.mjs";
import todoRouter from "./routers/todoRouter.mjs";
import tipsRouter from "./routers/tipsRouter.mjs";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();

const { CLIENT_URI } = process.env;

const corsOptions = cors({
  origin: CLIENT_URI,
  credentials: true,
});

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.URI;

mongoose.connect(uri, { useNewUrlParser: true });

app.use(express.json());
app.use(cookieParser());
app.use(corsOptions);
app.use("/login", loginRouter);
app.use("/todo", todoRouter);
app.use("/tips", tipsRouter);
app.listen(port);
