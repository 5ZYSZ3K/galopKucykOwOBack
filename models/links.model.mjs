import mongoose from "mongoose";

const Schema = mongoose.Schema;

const linksSchema = new Schema({
  link: String,
});

const Links = mongoose.model("Links", linksSchema);
export default Links;
