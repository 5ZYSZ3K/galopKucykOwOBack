import mongoose from "mongoose";

const Schema = mongoose.Schema;

const tipsSchema = new Schema({
  category: String,
  tip: String,
});

const Tips = mongoose.model("Tips", tipsSchema);
export default Tips;
