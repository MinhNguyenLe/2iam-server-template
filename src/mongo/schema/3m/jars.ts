import { mmmDb } from "mongo";
import { Schema } from "mongoose";

const JARSSchema = new Schema(
  {
    nec: Number,
    ply: Number,
    ffa: Number,
    edu: Number,
    lts: Number,
    giv: Number,
  },
  { typeKey: "$type" }
);
const JARSModel = mmmDb.model(
  "jars",
  JARSSchema
);

export default JARSModel;
