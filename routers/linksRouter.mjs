import express from "express";
import dotenv from "dotenv";
import auth from "../middleware/auth.mjs";
import Links from "../models/links.model.mjs";

dotenv.config();
const linksRouter = express.Router();

linksRouter.route("/").get(auth, (req, res) => {
  Links.find({}).then((data) => {
    res.send(data[Math.floor(Math.random() * data.length)]);
  });
});

export default linksRouter;
