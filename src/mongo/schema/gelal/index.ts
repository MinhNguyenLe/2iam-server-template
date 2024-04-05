import { Schema } from "mongoose";
import {
  educationSchema,
  experienceSchema,
  projectSchema,
  contactSchema,
  iamSchema,
  skillsSchema,
} from "../common";
import { templateDb } from "mongo";

const GelalsSchema = new Schema({
  created_at: Date,
  user_id: String,
  contact: contactSchema,
  experiences: [experienceSchema],
  educations: [educationSchema],
  projects: [projectSchema],
  skills: [skillsSchema],
  iam: iamSchema,
  is_active: Boolean,
});
const GelalsModel = templateDb.model("gelals", GelalsSchema);

export default GelalsModel;
