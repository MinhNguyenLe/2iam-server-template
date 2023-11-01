import { mmmDb } from "mongo";
import { Schema } from "mongoose";

const TransactionsSchema = new Schema({
  isProduction:Boolean,
  type:String,
  createdAt:Date,
  userId:String,
  label:{
    type:String,
    description:String,
  value:Number,
  date:Date
  }
});
const TransactionsModel = mmmDb.model("transactions", TransactionsSchema);

export default TransactionsModel;
