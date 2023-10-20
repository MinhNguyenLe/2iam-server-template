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
  postSchema,
  myselfSchema,
} from "../common";

const UsersSchema = new Schema(
  {
    username: String,
    created_at: Date,
    oauth: {
      google: {
        id: String,
        displayName: String,
        photos: [{ value: String }],
        emails: [{ value: String, verified: Boolean }],
        locale: String,
        hd: String,
      },
      linkedin: {
        id: String,
        displayName: String,
        picture: String,
        email: String,
        locale: {
          country: String,
          language: String,
        },
      },
      facebook: {
        id: String,
      },
      github: {
        id: String,
      },
    },
    resume: {
      link: String, // download resume by link
      languages: [languageSchema],
      iam: iamSchema,
      summary: summarySchema,
      contact: contactSchema,
      educations: [educationSchema],
      experiences: [experienceSchema],
      projects: [projectSchema],
      skills: [skillSchema],
      certifications: [certificationSchema],
      achievements: [achievementSchema],
      posts: [postSchema],
      group_images: [groupImageSchema],
      myself: myselfSchema,
    },
  },
  { typeKey: "$type" }
);
const UsersModel = dashboardDB.model("users", UsersSchema);

export default UsersModel;
