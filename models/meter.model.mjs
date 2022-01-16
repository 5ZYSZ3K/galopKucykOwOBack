import mongoose from "mongoose";

const Schema = mongoose.Schema;

const meterSchema = new Schema({
  date: String,
  value: Number,
  category: String,
  userId: String,
});

const Meter = mongoose.model("Meter", meterSchema);
export default Meter;
