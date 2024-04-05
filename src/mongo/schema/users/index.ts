import { dashboardDB } from "mongo";
import { Schema } from "mongoose";

import {
  experienceSchema,
  projectSchema,
  educationSchema,
  summarySchema,
  certificationSchema,
  skillsSchema,
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
        name: {
          familyName: String,
          givenName: String,
        },
        photos: [{ value: String }],
        emails: [{ value: String, verified: Boolean }],
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
      iam: iamSchema, // who am i
      contact: contactSchema, // contact information
      summary: summarySchema, // more information about me and  career or anything
      myself: myselfSchema, // more details about myself
      skills: skillsSchema,
      educations: [educationSchema],
      experiences: [experienceSchema],
      projects: [projectSchema],
      certifications: [certificationSchema],
      achievements: [achievementSchema],
      posts: [postSchema],
      languages: [languageSchema],
      group_images: [groupImageSchema],
    },
    templates: [{ name: String, id: String }],
  },
  { typeKey: "$type" }
);
const UsersModel = dashboardDB.model("users", UsersSchema);

export default UsersModel;
