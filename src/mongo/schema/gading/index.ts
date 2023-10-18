import { Schema } from "mongoose";
import {
  educationSchema,
  experienceSchema,
  projectSchema,
  summarySchema,
  contactSchema,
  postSchema,
  myselfSchema,
  iamSchema,
} from "../common";
import { templateDb } from "mongo";

const GadingSchema = new Schema({
  created_at: Date,
  user_id: String,
  summary: summarySchema,
  posts: [postSchema],
  projects: [projectSchema],
  myself: myselfSchema,
  iam: iamSchema,
  contact: contactSchema,
  experiences: [experienceSchema],
  educations: [educationSchema],
});
const GadingModel = templateDb.model("gading", GadingSchema);

export default GadingModel;
