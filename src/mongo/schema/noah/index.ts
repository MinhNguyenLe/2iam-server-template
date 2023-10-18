import { Schema } from "mongoose";
import {
  experienceSchema,
  projectSchema,
  summarySchema,
  contactSchema,
  iamSchema,
} from "../common";
import { templateDb } from "mongo";

const NoahSchema = new Schema({
  created_at: Date,
  user_id: String,
  resume_link: String,
  iam: iamSchema,
  summary: summarySchema,
  experiences: [experienceSchema],
  projects: [projectSchema],
  contact: contactSchema,
});
const NoahModel = templateDb.model("noah", NoahSchema);

export default NoahModel;
