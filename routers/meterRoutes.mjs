import express from "express";
import Meter from "../models/meter.model.mjs";
import dotenv from "dotenv";
import auth from "../middleware/auth.mjs";
dotenv.config();

const meterRouter = express.Router();

meterRouter.route("/").get(auth, (req, res) => {
  const { CLIENT_URI } = process.env;
  res.set("Access-Control-Allow-Origin", CLIENT_URI);
  Meter.find({ userId: req.userId }).then((data) => {
    res.json(data);
  });
});

meterRouter.route("/add").post(auth, (req, res) => {
  const newMeter = new Meter({ ...req.body, userId: req.userId });
  newMeter.save().then(res.send()).catch(res.status(401).send());
});

export default meterRouter;
