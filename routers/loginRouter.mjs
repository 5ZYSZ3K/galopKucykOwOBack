import express from "express";
import User from "../models/login.model.mjs";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth.mjs";
dotenv.config();

const loginRouter = express.Router();

loginRouter.route("/logout").post(auth, (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  res.send();
});

loginRouter.route("/check").get((req, res) => {
  const { CLIENT_URI } = process.env;
  res.set("Access-Control-Allow-Origin", CLIENT_URI);
  try {
    const { JWT_SECRET } = process.env;
    const token = req.cookies.token;
    if (!token) return res.json(false);
    jwt.verify(token, JWT_SECRET);
    res.json(true);
  } catch (e) {
    res.send(false);
  }
});

loginRouter.route("/").post((req, res) => {
  const { JWT_SECRET } = process.env;
  const { login, password } = req.body;
  User.findOne({ login })
    .then((user) => {
      if (!user) res.status(401).send("Failed4!");
      else {
        bcrypt
          .compare(password, user.passwordHash)
          .then((passed) => {
            if (!passed) res.status(401).send("Failed3!");
            else {
              const token = jwt.sign(
                {
                  user: user._id,
                },
                JWT_SECRET
              );
              res.cookie("token", token, { httpOnly: true });
              res.send();
            }
          })
          .catch(() => res.status(500).send("Failed2!"));
      }
    })
    .catch(() => res.status(500).send("Failed!"));
});

loginRouter.route("/create").post((req, res) => {
  try {
    const { JWT_SECRET } = process.env;
    const { password, login } = req.body;
    bcrypt
      .genSalt()
      .then((salt) => {
        bcrypt
          .hash(password, salt)
          .then((data) => {
            const passwordHash = data;
            const newUser = new User({
              login,
              passwordHash,
            });
            newUser
              .save((err, user) => {
                if (!err) {
                  const token = jwt.sign(
                    {
                      user: user._id,
                    },
                    JWT_SECRET
                  );
                  res.cookie("token", token, { httpOnly: true });
                  res.send();
                }
              })
              .catch((e) => {
                res.status(500).send(e);
              });
          })
          .catch((e) => {
            res.status(500).send("Failed2!");
          });
      })
      .catch(() => res.status(500).send("Failed3!"));
  } catch (e) {
    res.status(500).send("Failed!");
  }
});

export default loginRouter;
