import config from "@config/config";
import { createConnection, connect } from "mongoose";

const connectDBs = () => {
  try {
    const templateDb = createConnection(config.mongoUriTemplates, {
      serverSelectionTimeoutMS: 5000,
    });
    const dashboardDB = createConnection(config.mongoUriDashboard, {
      serverSelectionTimeoutMS: 5000,
    });

    return { templateDb, dashboardDB };
  } catch (error) {
    console.error(`Error connect mongo: ${error}`);
    process.exit(1);
  }
};
const { templateDb, dashboardDB } = connectDBs();

export { templateDb, dashboardDB };
