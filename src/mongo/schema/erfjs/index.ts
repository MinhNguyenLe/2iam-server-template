import { Schema, model } from "mongoose";

const ErfjsSchema = new Schema({
  // about_me: {
  //   say_hi: string,
  //   about_1: string,
  //   about_2: string,
  //   social_link: {
  //     github: string,
  //     linkedin: string,
  //     twitter: string,
  //     instagram: string,
  //   },
  // },
  // experience: [
  //   {
  //     title: string,
  //     date: Date,
  //     detail: [string],
  //   },
  // ],
});
const ErfjModel = model("erfjs", ErfjsSchema);

export default ErfjModel;
