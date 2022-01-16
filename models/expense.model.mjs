import mongoose from "mongoose";

const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  date: String,
  category: String,
  value: Number,
  userId: String,
});

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
