import { Schema } from "mongoose";
import {
  experienceSchema,
  summarySchema,
  contactSchema,
  iamSchema,
  educationSchema,
  groupImageSchema,
  skillsSchema,
} from "../common";
import { templateDb } from "mongo";

const BakerSchema = new Schema({
  created_at: Date,
  user_id: String,
  resume_link: String,
  iam: iamSchema,
  summary: summarySchema,
  contact: contactSchema,
  educations: [educationSchema],
  skills: [skillsSchema],
  group_images: [groupImageSchema],
  experiences: [experienceSchema],
});
const BakerModel = templateDb.model("baker", BakerSchema);

export default BakerModel;
