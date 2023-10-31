import config from "@config/config";
import { createConnection } from "mongoose";

const connectDBs = () => {
  try {
    const templateDb = createConnection(config.mongoUriTemplates, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("connected db template");

    const dashboardDB = createConnection(config.mongoUriDashboard, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("connected db dashboard");

    const mmmDb = createConnection(config.mongoUri3m, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("connected db 3m");

    return { templateDb, dashboardDB, mmmDb };
  } catch (error) {
    console.error(`Error connect mongo: ${error}`);
    process.exit(1);
  }
};
const { templateDb, dashboardDB, mmmDb } = connectDBs();

export { templateDb, dashboardDB, mmmDb };
