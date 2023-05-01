import mongoose, { model } from "mongoose";

const musicSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  link: {
    type: String,
    require: true,
  },
  linkImage: {
    type: String,
    require: true,
  },
  linkMusic: {
    type: String,
    require: true,
  },
});

export default mongoose.model("Music", musicSchema);
