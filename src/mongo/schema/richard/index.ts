import { Schema } from "mongoose";
import {
  educationSchema,
  experienceSchema,
  summarySchema,
  languageSchema,
  contactSchema,
} from "../common";
import { templateDb } from "mongo";

const RichardSchema = new Schema({
  created_at: Date,
  user_id: String,
  experiences: [experienceSchema],
  summary: summarySchema,
  languages: [languageSchema],
  educations: [educationSchema],
  contact: contactSchema,
});
const RichardModel = templateDb.model("richard", RichardSchema);

export default RichardModel;
