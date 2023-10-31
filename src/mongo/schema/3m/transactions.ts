import { mmmDb } from "mongo";
import { Schema } from "mongoose";

const TransactionsSchema = new Schema({});
const TransactionsModel = mmmDb.model("transactions", TransactionsSchema);

export default TransactionsModel;
