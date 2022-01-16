import express from "express";
import Expense from "../models/expense.model.mjs";
import dotenv from "dotenv";
import auth from "../middleware/auth.mjs";
dotenv.config();

const expensesRouter = express.Router();

expensesRouter.route("/").get(auth, (req, res) => {
  const { CLIENT_URI } = process.env;
  res.set("Access-Control-Allow-Origin", CLIENT_URI);
  Expense.find({ userId: req.userId }).then((data) => {
    res.json(data);
  });
});

expensesRouter.route("/add").post(auth, (req, res) => {
  const newExpense = new Expense({ ...req.body, userId: req.userId });
  newExpense.save().then(res.send()).catch(res.status(401).send());
});

export default expensesRouter;
