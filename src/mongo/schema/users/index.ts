import { dashboardDB } from "mongo";
import { Schema } from "mongoose";

import {
  experienceSchema,
  projectSchema,
  educationSchema,
  summarySchema,
  certificationSchema,
  skillSchema,
  languageSchema,
  achievementSchema,
  contactSchema,
  iamSchema,
  groupImageSchema,
  postSchema,myselfSchema
} from "../common";

const UsersSchema = new Schema({
  username: String,
  created_at: Date,
  oauth: {
    google: {
      id: String,
      displayName: String,
      photos: [{ value: String }],
    },
    linkedin: {
      id: String,
    },
    facebook: {
      id: String,
    },
    github: {
      id: String,
    },
    twitter: { id: String },
    instagram: { id: String },
  },
  resume: {
    link: String,
    languages: [languageSchema],
    iam: iamSchema,
    summary: summarySchema,
    experiences: [experienceSchema],
    projects: [projectSchema],
    educations: [educationSchema],
    skills: [skillSchema],
    contact: contactSchema,
    certifications: [certificationSchema],
    achievements: [achievementSchema],
    posts: [postSchema],
    group_images: [groupImageSchema],
    myself: myselfSchema
  },
});
const UsersModel = dashboardDB.model("users", UsersSchema);

export default UsersModel;
