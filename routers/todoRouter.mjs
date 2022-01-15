import express from "express";
import dotenv from "dotenv";
import auth from "../middleware/auth.mjs";
import Todo from "../models/todo.model.mjs";

dotenv.config();
const { CLIENT_URI } = process.env;
const todoRouter = express.Router();

todoRouter
  .route("/handle")
  .post(auth, (req, res) => {
    const { body } = req;
    const newTodo = new Todo({ ...body, userId: req.userId });
    newTodo.save();
    res.send();
  })
  .delete(auth, (req, res) => {
    console.log(req.body);
    Todo.deleteOne({ _id: req.body.id })
      .then((o) => {
        console.log(o);
        res.send("Works!");
      })
      .catch(() => {
        res.status(401).send("Failded!");
      });
  });

todoRouter.route("/gettodo").get(auth, (req, res) => {
  res.set("Access-Control-Allow-Origin", CLIENT_URI);
  Todo.find({ type: "todo", userId: req.userId }).then((data) => {
    res.json(data);
  });
});

todoRouter.route("/getnottodo").get(auth, (req, res) => {
  res.set("Access-Control-Allow-Origin", CLIENT_URI);
  Todo.find({ type: "nottodo", userId: req.userId }).then((data) => {
    res.json(data);
  });
});

export default todoRouter;
