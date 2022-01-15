import express from "express";
import dotenv from "dotenv";
import auth from "../middleware/auth.mjs";
import Tips from "../models/tips.model.mjs";

dotenv.config();
const { CLIENT_URI } = process.env;
const tipsRouter = express.Router();

tipsRouter.route("/").get(auth, (req, res) => {
  Tips.find({}).then((data) => {
    res.send(data[Math.floor(Math.random() * data.length)]);
  });
});

export default tipsRouter;
