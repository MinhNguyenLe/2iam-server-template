import { Schema } from "mongoose";
import {
  educationSchema,
  experienceSchema,
  projectSchema,
  summarySchema,
  skillsSchema,
  contactSchema,
  postSchema,
} from "../common";
import { templateDb } from "mongo";

const AlamSchema = new Schema({
  created_at: Date,
  user_id: String,
  resume_link: String,
  summary: summarySchema,
  contact: contactSchema,
  skills: [skillsSchema],
  experiences: [experienceSchema],
  educations: [educationSchema],
  projects: [projectSchema],
  posts: [postSchema],
  github_projects: [
    {
      link: String,
      name: String,
    },
  ],
});
const AlamModel = templateDb.model("alam", AlamSchema);

export default AlamModel;
