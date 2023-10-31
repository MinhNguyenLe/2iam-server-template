import { Schema } from "mongoose";
import {
  educationSchema,
  experienceSchema,
  summarySchema,
  contactSchema,
  iamSchema,
  skillsSchema,
} from "../common";
import { templateDb } from "mongo";

const AliSchema = new Schema({
  created_at: Date,
  user_id: String,
  iam: iamSchema,
  summary: summarySchema,
  contact: contactSchema,
  experiences: [experienceSchema],
  educations: [educationSchema],
  skills: [skillsSchema],
});
const AliModel = templateDb.model("ali", AliSchema);

export default AliModel;
