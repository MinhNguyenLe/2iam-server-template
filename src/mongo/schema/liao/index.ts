import { Schema } from "mongoose";
import {
  educationSchema,
  experienceSchema,
  projectSchema,
  summarySchema,
  languageSchema,
  certificationSchema,
  skillsSchema,
  achievementSchema,
  contactSchema,
} from "../common";
import { templateDb } from "mongo";

const LiaoSchema = new Schema({
  created_at: Date,
  user_id: String,
  summary: summarySchema,
  experiences: [experienceSchema],
  projects: [projectSchema],
  educations: [educationSchema],
  languages: [languageSchema],
  certifications: [certificationSchema],
  skills: [skillsSchema],
  achievements: [achievementSchema],
  contact: contactSchema,
});
const LiaoModel = templateDb.model("liao", LiaoSchema);

export default LiaoModel;
