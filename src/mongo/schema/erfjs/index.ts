import { templateDb } from "mongo";
import { Schema } from "mongoose";

const ErfjsSchema = new Schema({
  about_me: {
    say_hi: String,
    about_1: String,
    about_2: String,
    social_link: {
      github: String,
      linkedin: String,
      twitter: String,
      instagram: String,
    },
  },
  experience: [
    {
      title: String,
      date: Date,
      detail: [String],
    },
  ],
});
const ErfjModel = templateDb.model("erfjs", ErfjsSchema);

export default ErfjModel;
