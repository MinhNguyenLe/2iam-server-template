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
      date: String,
      details: [String],
    },
  ],
  created_at: Date,
  user_id: String,
});
const ErfjModel = templateDb.model("erfjs", ErfjsSchema);

export default ErfjModel;
