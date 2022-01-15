import mongoose from "mongoose";

const Schema = mongoose.Schema;

const loginSchema = new Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", loginSchema);
export default User;
