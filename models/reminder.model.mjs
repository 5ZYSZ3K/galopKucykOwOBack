import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reminderSchema = new Schema({
  date: String,
  name: String,
  time: String,
  periodicity: Number,
  userId: String,
});

const Reminder = mongoose.model("Reminder", reminderSchema);
export default Reminder;
