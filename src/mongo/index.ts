import mongoose from "mongoose";
import config from "@config/config";

mongoose.set("strictQuery", false);

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(config.mongoUri);
}
