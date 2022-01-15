import mongoose from "mongoose";

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  name: String,
  price: Number,
  time: Number,
  userId: String,
  type: String,
});

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
