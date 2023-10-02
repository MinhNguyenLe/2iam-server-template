import config from "@config/config";
import { connect } from "mongoose";

const uri = config.mongoUri;

connect(uri, {
  serverSelectionTimeoutMS: 5000,
  dbName: "db_templates",
}).catch((err) => console.log("Mongo error: ", err.reason));
