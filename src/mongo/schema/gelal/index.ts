import { Schema } from "mongoose";
import {
  educationSchema,
  experienceSchema,
  projectSchema,
  contactSchema,
  iamSchema,
  skillSchema,
} from "../common";
import { templateDb } from "mongo";

const GelalsSchema = new Schema({
  created_at: Date,
  user_id: String,
  contact: contactSchema,
  experiences: [experienceSchema],
  educations: [educationSchema],
  projects: [projectSchema],
  skills: [skillSchema],
  iam: iamSchema,
});
const GelalsModel = templateDb.model("gelals", GelalsSchema);

export default GelalsModel;
