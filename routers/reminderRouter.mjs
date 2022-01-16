import express from "express";
import Reminder from "../models/reminder.model.mjs";
import dotenv from "dotenv";
import auth from "../middleware/auth.mjs";
dotenv.config();

const reminderRouter = express.Router();

reminderRouter.route("/").get(auth, (req, res) => {
  const { CLIENT_URI } = process.env;
  res.set("Access-Control-Allow-Origin", CLIENT_URI);
  Reminder.find({ userId: req.userId }).then((data) => {
    data.forEach((rem) => {
      const today = new Date();
      const todaySplitted = [
        today.getFullYear(),
        today.getMonth() + 1,
        today.getDate(),
        today.getHours(),
        today.getMinutes(),
      ];
      const dateSplitted = rem.date.split("-").map((n) => parseInt(n));
      const timeSplitted = rem.time.split(":").map((n) => parseInt(n));
      if (
        (dateSplitted[0] < todaySplitted[0] ||
          (dateSplitted[0] === todaySplitted[0] &&
            dateSplitted[1] < todaySplitted[1]) ||
          (dateSplitted[0] === todaySplitted[0] &&
            dateSplitted[1] === todaySplitted[1] &&
            dateSplitted[2] < todaySplitted[2]) ||
          (dateSplitted[0] === todaySplitted[0] &&
            dateSplitted[1] === todaySplitted[1] &&
            dateSplitted[2] === todaySplitted[2] &&
            timeSplitted[0] < todaySplitted[3]) ||
          (dateSplitted[0] === todaySplitted[0] &&
            dateSplitted[1] === todaySplitted[1] &&
            dateSplitted[2] === todaySplitted[2] &&
            timeSplitted[0] === todaySplitted[3] &&
            timeSplitted[1] < todaySplitted[4])) &&
        rem.periodicity !== 0
      ) {
        Reminder.deleteOne({ _id: rem._id }).then();
      }
    });
    res.json(data);
  });
});

reminderRouter
  .route("/add")
  .post(auth, (req, res) => {
    const newReminder = new Reminder({ ...req.body, userId: req.userId });
    newReminder.save().then(res.send()).catch(res.status(401).send());
  })
  .delete(auth, (req, res) => {
    Reminder.deleteOne({ _id: req.body.id })
      .then((e) => res.send(e))
      .catch(() => res.status(401).send());
  });

export default reminderRouter;
