import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export default function auth(req, res, next) {
  try {
    const { JWT_SECRET } = process.env;
    const token = req.cookies.token;
    if (!token) return res.status(401).send();
    const verified = jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err) res.status(401).send();
      else {
        req.userId = decodedToken.user;
        next();
      }
    });
  } catch (err) {
    console.log(err);
    res.status(401).send();
  }
}
