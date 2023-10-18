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

const GelalSchema = new Schema({
  created_at: Date,
  user_id: String,
  contact: contactSchema,
  experiences: [experienceSchema],
  educations: [educationSchema],
  projects: [projectSchema],
  skills: [skillSchema],
  iam: iamSchema,
});
const GelalModel = templateDb.model("gelal", GelalSchema);

export default GelalModel;
